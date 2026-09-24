'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { COD_FEE, FREE_SHIP_AT, ORDER_STAGES, PRODUCTS, SHIPPING_FEE } from '@/data/products';
import { getProduct } from '@/lib/utils';

export type CartLine = { key: string; slug: string; size: number; qty: number };
export type Address = {
  id: string; label: string; name: string; line: string;
  city: string; st: string; pin: string; phone: string; def: boolean;
};
export type Order = {
  no: string; date: string; email: string;
  items: { slug: string; size: number; qty: number }[];
  total: number; stage: number;
};

type Persisted = {
  cart: CartLine[];
  wish: string[];
  recent: string[];
  addresses: Address[];
  orders: Order[];
  details: { name: string; email: string; phone: string };
};

const KEY = 'upanat-store-v1';

const SEED: Persisted = {
  cart: [],
  wish: [],
  recent: [],
  addresses: [
    { id: 'a1', label: 'Home', name: 'Ananya Mehra', line: 'C-14, Second Floor, Hauz Khas Enclave', city: 'New Delhi', st: 'Delhi', pin: '110016', phone: '98100 00000', def: true },
    { id: 'a2', label: 'Work', name: 'Ananya Mehra', line: '4th Floor, N Block, Connaught Place', city: 'New Delhi', st: 'Delhi', pin: '110001', phone: '98100 00000', def: false }
  ],
  orders: [
    { no: 'UPS-10482', date: '12 Sep 2026', email: 'ananya@example.com', items: [{ slug: 'noorani', size: 38, qty: 1 }], total: 3199, stage: 2 }
  ],
  details: { name: 'Ananya Mehra', email: 'ananya@example.com', phone: '98100 00000' }
};

type Action =
  | { t: 'hydrate'; v: Persisted }
  | { t: 'add'; slug: string; size: number; qty: number }
  | { t: 'qty'; key: string; delta: number }
  | { t: 'remove'; key: string }
  | { t: 'clearCart' }
  | { t: 'wish'; slug: string }
  | { t: 'unwish'; slug: string }
  | { t: 'viewed'; slug: string }
  | { t: 'saveAddress'; a: Address }
  | { t: 'deleteAddress'; id: string }
  | { t: 'defaultAddress'; id: string }
  | { t: 'order'; o: Order }
  | { t: 'details'; v: Persisted['details'] };

function withOneDefault(list: Address[]): Address[] {
  if (!list.length) return list;
  return list.some((a) => a.def) ? list : list.map((a, i) => ({ ...a, def: i === 0 }));
}

function reducer(s: Persisted, a: Action): Persisted {
  switch (a.t) {
    case 'hydrate':
      return a.v;
    case 'add': {
      const key = `${a.slug}-${a.size}`;
      const found = s.cart.find((l) => l.key === key);
      return {
        ...s,
        cart: found
          ? s.cart.map((l) => (l.key === key ? { ...l, qty: l.qty + a.qty } : l))
          : [...s.cart, { key, slug: a.slug, size: a.size, qty: a.qty }]
      };
    }
    case 'qty':
      return {
        ...s,
        cart: s.cart.flatMap((l) => {
          if (l.key !== a.key) return [l];
          const qty = l.qty + a.delta;
          return qty < 1 ? [] : [{ ...l, qty }];
        })
      };
    case 'remove':
      return { ...s, cart: s.cart.filter((l) => l.key !== a.key) };
    case 'clearCart':
      return { ...s, cart: [] };
    case 'wish':
      return s.wish.includes(a.slug) ? s : { ...s, wish: [...s.wish, a.slug] };
    case 'unwish':
      return { ...s, wish: s.wish.filter((x) => x !== a.slug) };
    case 'viewed':
      return { ...s, recent: [a.slug, ...s.recent.filter((x) => x !== a.slug)].slice(0, 8) };
    case 'saveAddress': {
      const exists = s.addresses.some((x) => x.id === a.a.id);
      let list = exists ? s.addresses.map((x) => (x.id === a.a.id ? a.a : x)) : [...s.addresses, a.a];
      if (a.a.def) list = list.map((x) => ({ ...x, def: x.id === a.a.id }));
      return { ...s, addresses: withOneDefault(list) };
    }
    case 'deleteAddress':
      // Deleting the default promotes the next address in the list.
      return { ...s, addresses: withOneDefault(s.addresses.filter((x) => x.id !== a.id)) };
    case 'defaultAddress':
      return { ...s, addresses: s.addresses.map((x) => ({ ...x, def: x.id === a.id })) };
    case 'order':
      return { ...s, orders: [a.o, ...s.orders] };
    case 'details':
      return { ...s, details: a.v };
    default:
      return s;
  }
}

export type UiState = {
  bagOpen: boolean;
  searchOpen: boolean;
  quickView: { slug: string; move?: boolean; intent?: 'buy' } | null;
  sizeGuide: boolean;
  lightbox: { slug: string; index: number } | null;
};

type Ctx = {
  ready: boolean;
  state: Persisted;
  dispatch: (a: Action) => void;
  ui: UiState;
  setUi: (patch: Partial<UiState>) => void;
  /** Adds to bag and runs the fly-to-cart choreography from the given element. */
  addToBag: (slug: string, size: number, qty?: number, origin?: HTMLElement | null) => void;
  toggleWish: (slug: string) => void;
  subtotal: number;
  count: number;
  shipping: number;
  bagIconRef: React.RefObject<HTMLButtonElement>;
  lastOrder: Order | null;
  setLastOrder: (o: Order | null) => void;
};

const StoreCtx = createContext<Ctx | null>(null);

export const useStore = () => {
  const c = useContext(StoreCtx);
  if (!c) throw new Error('useStore must be used inside <StoreProvider>');
  return c;
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, SEED);
  const [ready, setReady] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [ui, setUiState] = useState<UiState>({
    bagOpen: false, searchOpen: false, quickView: null, sizeGuide: false, lightbox: null
  });
  const bagIconRef = useRef<HTMLButtonElement>(null);

  const setUi = useCallback((patch: Partial<UiState>) => setUiState((u) => ({ ...u, ...patch })), []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ t: 'hydrate', v: { ...SEED, ...JSON.parse(raw) } });
    } catch {
      /* private mode or blocked storage — the seed state is fine */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  // Esc closes every overlay, innermost-first behaviour handled by each surface.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setUiState({ bagOpen: false, searchOpen: false, quickView: null, sizeGuide: false, lightbox: null });
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const anyOverlay = ui.bagOpen || ui.searchOpen || !!ui.quickView || ui.sizeGuide || !!ui.lightbox;
  useEffect(() => {
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [anyOverlay]);

  const subtotal = useMemo(
    () => state.cart.reduce((sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.qty, 0),
    [state.cart]
  );
  const count = useMemo(() => state.cart.reduce((n, l) => n + l.qty, 0), [state.cart]);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIP_AT ? 0 : SHIPPING_FEE;

  const addToBag = useCallback<Ctx['addToBag']>((slug, size, qty = 1, origin) => {
    dispatch({ t: 'add', slug, size, qty });
    flyToBag(origin ?? null, bagIconRef.current);
  }, []);

  const toggleWish = useCallback(
    (slug: string) => dispatch(state.wish.includes(slug) ? { t: 'unwish', slug } : { t: 'wish', slug }),
    [state.wish]
  );

  const value: Ctx = {
    ready, state, dispatch, ui, setUi, addToBag, toggleWish,
    subtotal, count, shipping, bagIconRef, lastOrder, setLastOrder
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

/**
 * Clones the nearest product image and arcs it into the header bag icon, then
 * bounces the icon. Skipped entirely under reduced-motion.
 */
function flyToBag(origin: HTMLElement | null, target: HTMLElement | null) {
  if (typeof window === 'undefined') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!target) return;

  const source =
    origin?.closest('[data-frame]')?.querySelector('img') ??
    origin?.closest('[data-product]')?.querySelector('img') ??
    document.querySelector<HTMLImageElement>('[data-frame] img');

  const to = target.getBoundingClientRect();

  if (source instanceof HTMLImageElement) {
    const from = source.getBoundingClientRect();
    const ghost = source.cloneNode(true) as HTMLImageElement;
    Object.assign(ghost.style, {
      position: 'fixed', left: `${from.left}px`, top: `${from.top}px`,
      width: `${from.width}px`, height: `${from.height}px`,
      objectFit: 'cover', border: '1px solid rgba(201,151,46,.7)',
      zIndex: '120', pointerEvents: 'none', borderRadius: '0'
    } satisfies Partial<CSSStyleDeclaration>);
    document.body.appendChild(ghost);

    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    ghost
      .animate(
        [
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: `translate(${dx * 0.35}px, ${dy * 0.3 - 120}px) scale(.55)`, opacity: 0.95, offset: 0.55 },
          { transform: `translate(${dx}px, ${dy}px) scale(.08)`, opacity: 0 }
        ],
        { duration: 640, easing: 'cubic-bezier(.22,.61,.36,1)' }
      )
      .addEventListener('finish', () => ghost.remove());
  }

  setTimeout(() => {
    target.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.28) rotate(-6deg)', offset: 0.3 },
        { transform: 'scale(.9)', offset: 0.6 },
        { transform: 'scale(1.06)', offset: 0.82 },
        { transform: 'scale(1)' }
      ],
      { duration: 620, easing: 'cubic-bezier(.22,.61,.36,1)' }
    );
    target.querySelector('[data-badge]')?.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.6)', offset: 0.4 }, { transform: 'scale(1)' }],
      { duration: 520, easing: 'cubic-bezier(.22,.61,.36,1)' }
    );
  }, 560);
}

export { FREE_SHIP_AT, SHIPPING_FEE, COD_FEE, ORDER_STAGES, PRODUCTS };

export type Gender = 'Women' | 'Men';
export type Category = 'Jutti' | 'Block heels' | 'Mules' | 'Wedge' | 'Men shoes';

export type Product = {
  slug: string;
  name: string;
  cat: Category;
  g: Gender;
  price: number;
  was?: number;
  color: string;
  work: string;
  short: string;
  long: string;
  imgs: string[];
  rank: number;
  fresh: number;
};

/**
 * Copy for Kiyana, Sunheri, Raven and Darbar is verbatim from upanatstudio.com.
 * The remaining pairs carry studio-voice copy pending client sign-off; every
 * photograph is the product's own gallery, pulled from the live catalogue.
 */
export const PRODUCTS: Product[] = [
  {
    slug: 'kiyana', name: 'Kiyana', cat: 'Jutti', g: 'Women', price: 2499,
    color: 'Emerald', work: 'Zardozi',
    short: 'Deep emerald with gold zardozi, leaf motifs and sequin accents',
    long: 'Embodying regal charm, the Kiyana juttis feature a deep emerald green base beautifully highlighted with elaborate gold zardozi embroidery, leaf motifs, and subtle sequin accents.',
    imgs: ['kiyana-1.webp', 'kiyana-2.webp', 'kiyana-3.webp'], rank: 1, fresh: 4
  },
  {
    slug: 'sunheri', name: 'Sunheri', cat: 'Wedge', g: 'Women', price: 2499,
    color: 'Gold', work: 'Gold sequin',
    short: 'A 4-inch Kolhapuri-inspired wedge slide with geometric gold sequins',
    long: 'Reach new heights of festive glamour without tiring your feet. Sunheri is our premium 4-inch Kolhapuri-inspired wedge slide, adorned with geometric gold sequins. Perfect for long wedding rituals, mehendi functions, or daytime celebrations.',
    imgs: ['sunheri-1.webp', 'sunheri-2.webp', 'sunheri-3.webp', 'sunheri-4.webp', 'sunheri-5.webp', 'sunheri-6.webp'], rank: 2, fresh: 1
  },
  {
    slug: 'raven', name: 'Raven', cat: 'Block heels', g: 'Women', price: 2499,
    color: 'Black', work: 'Metallic accent',
    short: 'Minimalist strappy heel with a chunky gold toe-ring accent',
    long: 'Sleek, modern, and undeniably chic, Raven blends minimalist strappy design with an eye-catching metallic accent: a chunky gold toe-ring for a touch of modern luxury.',
    imgs: ['raven-1.webp', 'raven-2.webp', 'raven-3.webp', 'raven-4.webp'], rank: 3, fresh: 2
  },
  {
    slug: 'darbar-brown', name: 'Darbar (Brown)', cat: 'Men shoes', g: 'Men', price: 2499,
    color: 'Brown', work: 'Festive loafer',
    short: 'Men’s festive loafer with all-day comfort padding and an adjustable back strap',
    long: 'Redefining regal sophistication for the modern gentleman, Darbar is our exclusive men’s festive loafer, here in a rich brown finish. Engineered for high-end events where you need to stay on your feet, it comes built with all-day comfort padding and an innovative, adjustable back strap.',
    imgs: ['darbar-brown-1.webp', 'darbar-brown-2.webp', 'darbar-brown-3.webp'], rank: 4, fresh: 3
  },
  {
    slug: 'darbar-black', name: 'Darbar (Black)', cat: 'Men shoes', g: 'Men', price: 2499,
    color: 'Black', work: 'Festive loafer',
    short: 'Men’s festive loafer in a polished black finish, with an adjustable back strap',
    long: 'Redefining regal sophistication for the modern gentleman, Darbar is our exclusive men’s festive loafer in a polished black finish. Engineered for high-end events where you need to stay on your feet, it comes built with all-day comfort padding and an innovative, adjustable back strap.',
    imgs: ['darbar-black-1.webp', 'darbar-black-2.webp', 'darbar-black-3.webp'], rank: 5, fresh: 5
  },
  {
    slug: 'noorani', name: 'Noorani', cat: 'Jutti', g: 'Women', price: 3199,
    color: 'Gold', work: 'Zardozi',
    short: 'Ivory and antique-gold zardozi, worked panel by panel across the vamp',
    long: 'Noorani carries light the way its name suggests. An ivory base is worked panel by panel in antique-gold zardozi, the thread raised just enough to catch the room. Finished on a padded leather sole so the shine lasts the whole evening.',
    imgs: ['noorani-1.webp', 'noorani-2.webp', 'noorani-3.webp', 'noorani-4.webp', 'noorani-5.webp', 'noorani-6.webp', 'noorani-7.webp'], rank: 6, fresh: 6
  },
  {
    slug: 'begum', name: 'Begum', cat: 'Jutti', g: 'Women', price: 2499,
    color: 'Emerald', work: 'Hand embroidery',
    short: 'A quieter jutti — dense hand embroidery on a soft, everyday last',
    long: 'Begum is the pair you reach for when the occasion does not announce itself. Dense hand embroidery runs across the vamp in tonal thread, set on our softest everyday last, so it sits as easily with denim as with a kurta.',
    imgs: ['begum-1.webp', 'begum-2.webp', 'begum-3.webp', 'begum-4.webp'], rank: 7, fresh: 7
  },
  {
    slug: 'deedar', name: 'Deedar', cat: 'Jutti', g: 'Women', price: 3199,
    color: 'Gold', work: 'Zardozi',
    short: 'Mirror-bright zardozi and sequin clusters across a deep-toned vamp',
    long: 'Deedar means the sight of something worth looking at. Mirror-bright zardozi and clustered sequins are laid across a deep-toned vamp by hand, each cluster placed rather than repeated — no two pairs catch the light identically.',
    imgs: ['deedar-1.webp', 'deedar-2.webp', 'deedar-3.webp', 'deedar-4.webp'], rank: 8, fresh: 8
  },
  {
    slug: 'nazakat', name: 'Nazakat', cat: 'Jutti', g: 'Women', price: 3199,
    color: 'Gold', work: 'Fine thread work',
    short: 'Fine thread work, leaf motifs and a delicately scalloped topline',
    long: 'Nazakat is our most delicate hand. Fine thread work traces leaf motifs across the vamp and the topline is scalloped by hand, which takes a karigar the better part of a day per pair. Padded leather sole, as always.',
    imgs: ['nazakat-1.webp', 'nazakat-2.webp', 'nazakat-3.webp', 'nazakat-4.webp', 'nazakat-5.webp', 'nazakat-6.webp', 'nazakat-7.webp'], rank: 9, fresh: 9
  },
  {
    slug: 'chitra', name: 'Chitra', cat: 'Jutti', g: 'Women', price: 2499,
    color: 'Emerald', work: 'Hand embroidery',
    short: 'Picture-work embroidery — motifs drawn on, then filled in thread',
    long: 'Chitra means picture, and that is how it is made: the motif is drawn onto the vamp first, then filled in thread by hand. The result reads as illustration rather than pattern, and it sits on the same padded leather sole as every pair we make.',
    imgs: ['chitra-1.webp', 'chitra-2.webp', 'chitra-3.webp', 'chitra-4.webp', 'chitra-5.webp'], rank: 10, fresh: 10
  },
  {
    slug: 'heer', name: 'Heer', cat: 'Wedge', g: 'Women', price: 2499,
    color: 'Gold', work: 'Wedge slide',
    short: 'A softer wedge slide, built to be worn standing for hours',
    long: 'Heer is the wedge for the long half of the day. A gentler pitch than Sunheri, a wider footbed and the same comfort padding underneath — made for the ceremonies where you are on your feet far longer than anyone planned.',
    imgs: ['heer-1.webp', 'heer-2.webp', 'heer-3.webp', 'heer-4.webp'], rank: 11, fresh: 11
  },
  {
    slug: 'saahibo', name: 'Saahibo', cat: 'Wedge', g: 'Women', price: 3199,
    color: 'Gold', work: 'Embellished wedge',
    short: 'Our most embellished wedge — hand-set sequin work over the full strap',
    long: 'Saahibo is the loudest pair in the collection, and it earns it. Sequins are hand-set across the full width of the strap and carried over the sidewall of the wedge, so the work reads from every angle. Built on the same tested footbed.',
    imgs: ['saahibo-1.webp', 'saahibo-2.webp', 'saahibo-3.webp', 'saahibo-4.webp'], rank: 12, fresh: 12
  },
  {
    slug: 'taara', name: 'Taara', cat: 'Mules', g: 'Women', price: 2499,
    color: 'Gold', work: 'Star sequin',
    short: 'An easy-on mule with scattered star sequins across the vamp',
    long: 'Taara is the pair you step into on the way out of the door. Star sequins are scattered — never lined up — across a covered vamp, and the open back means no fastening to think about. Padded leather sole underneath.',
    imgs: ['taara-1.webp', 'taara-2.webp', 'taara-3.webp'], rank: 13, fresh: 13
  }
];

export const CATEGORIES: Category[] = ['Jutti', 'Block heels', 'Mules', 'Wedge', 'Men shoes'];

export const COLORS = [
  { n: 'Emerald', hex: '#0F4C3A' },
  { n: 'Gold', hex: '#D6B461' },
  { n: 'Black', hex: '#221A14' },
  { n: 'Brown', hex: '#7A4E2D' }
];

export const WOMENS_SIZES = [36, 37, 38, 39, 40, 41];
export const MENS_SIZES = [6, 7, 8, 9, 10, 11];

export const SIZE_CHART = {
  Women: [
    { eu: 36, uk: 3, cm: '22.8' }, { eu: 37, uk: 4, cm: '23.5' }, { eu: 38, uk: 5, cm: '24.1' },
    { eu: 39, uk: 6, cm: '24.8' }, { eu: 40, uk: 7, cm: '25.4' }, { eu: 41, uk: 8, cm: '26.0' }
  ],
  Men: [
    { eu: 6, uk: 40, cm: '24.5' }, { eu: 7, uk: 41, cm: '25.4' }, { eu: 8, uk: 42, cm: '26.2' },
    { eu: 9, uk: 43, cm: '27.1' }, { eu: 10, uk: 44, cm: '27.9' }, { eu: 11, uk: 45, cm: '28.8' }
  ]
} as const;

/** "Often bought together" partner for each pair. */
export const PAIR: Record<string, string> = {
  kiyana: 'noorani', noorani: 'kiyana', begum: 'chitra', chitra: 'begum',
  deedar: 'nazakat', nazakat: 'deedar', 'darbar-brown': 'darbar-black',
  'darbar-black': 'darbar-brown', sunheri: 'kiyana', heer: 'sunheri',
  saahibo: 'sunheri', raven: 'taara', taara: 'raven'
};

export const CATEGORY_TILES = [
  { id: 'jutti', cat: 'Jutti' as Category, label: 'Juttis', sub: 'Zardozi, leaf motifs & sequin work', col: 'span 5', row: 'span 2', arch: true, a: ['kiyana', 0, 1] as const },
  { id: 'block', cat: 'Block heels' as Category, label: 'Block heels', sub: 'Steady height for long functions', col: 'span 4', row: 'span 1', arch: false, a: ['raven', 0, 1] as const },
  { id: 'mules', cat: 'Mules' as Category, label: 'Mules', sub: 'Easy on, easy off', col: 'span 3', row: 'span 1', arch: false, a: ['taara', 0, 1] as const },
  { id: 'wedge', cat: 'Wedge' as Category, label: 'Wedges', sub: 'Height, without tiring your feet', col: 'span 3', row: 'span 1', arch: false, a: ['sunheri', 0, 4] as const },
  { id: 'men', cat: 'Men shoes' as Category, label: 'Men', sub: 'Festive loafers for him', col: 'span 4', row: 'span 1', arch: false, a: ['darbar-brown', 0, 1] as const }
];

export const ORDER_STAGES = ['Order placed', 'Crafted & packed', 'Dispatched from Delhi', 'Out for delivery', 'Delivered'];

export const FREE_SHIP_AT = 2999;
export const SHIPPING_FEE = 99;
export const COD_FEE = 49;

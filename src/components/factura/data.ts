export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "“Every day I discover yet another way to put WorkPhelo to work. The sheer power of the application keeps impressing me, and I recommend it without a second thought to anyone searching for the right software for their business”",
    name: "Prince Andrews L.Zutah",
    role: "Head of IT, Bisvel Group of Companies",
  },
  {
    quote:
      "“WorkPhelo’s blend of flexibility and simplicity continues to impress us. We started out with the desktop edition, then moved our clients onto WorkPhelo Web — project accounting and group consolidated reports suddenly became effortless. It has become a core piece of the solutions we deliver to our client businesses”",
    name: "Martin Owusu",
    role: "Head Application Development & Business Services – Qualtek Limited -Ghana",
  },
  {
    quote: "“In case I don’t say it enough — I absolutely LOVE WorkPhelo”",
    name: "Inna Oleksiichuk",
    role: "Director, MilaVitsa",
  },
  {
    quote: "“AccountingPhelo makes handling our accounting remarkably quick and painless”",
    name: "Isaac Barkah",
    role: "Emerald Properties",
  },
];

export const HOME_CLIENTS = [
  "clogo-baxoil-logo.png",
  "clogo-pbsl-logo.png",
  "clogo-eib-logo.jpg",
  "clogo-dainikamadershomoy-logo.png",
  "clogo-delta-airlines-logo.png",
  "clogo-emerald-logo.jpg",
  "clogo-GNLOGO.png",
  "clogo-jewels-mart-logo.png",
  "clogo-rrgobal-logo.png",
  "clogo-ustc-logo.png",
].map((f) => `/assets/img/page-financials/${f}`);

export const PAYROLL_CLIENTS = [
  "clients-pbsl-logo.png",
  "clients-eib-logo.jpg",
  "clients-deen-logo.png",
  "clients-IMCC-logo.jpeg",
  "clients-MIST-logo.png",
  "clients-MK-logo.png",
  "clients-NRL-logo.jpg",
  "clients-PKF-logo.jpg",
  "clients-vegpro-logo.png",
].map((f) => `/assets/img/page-payroll/${f}`);

export interface Product {
  slug: string;
  label: string;
  className: string;
  title: string;
  desc: string;
  packImg: string;
}

export const PRODUCTS: Record<string, Product> = {
  financial: {
    slug: "/financial",
    label: "Financials",
    className: "financial",
    title: "AccountingPhelo",
    desc: "AccountingPhelo brings your business accounting online, simply and securely.",
    packImg: "/assets/img/pack-financial.svg",
  },
  payroll: {
    slug: "/payroll",
    label: "HRMS",
    className: "payroll",
    title: "HRPhelo",
    desc: "HRPhelo takes the hassle out of Payroll and HR management for organizations of every size.",
    packImg: "/assets/img/pack-payroll.svg",
  },
  contract: {
    slug: "/contract",
    label: "Customized Software",
    className: "contract",
    title: "Customized Software",
    desc: "Datrix builds bespoke software shaped around the way you work — web, mobile and integrations that belong entirely to you.",
    packImg: "/assets/img/pack-contract.svg",
  },
  crm: {
    slug: "/crm",
    label: "CRM",
    className: "crm",
    title: "MarketingPhelo",
    desc: "MarketingPhelo keeps your sales pipeline organised, your team’s activities visible and your win rate climbing.",
    packImg: "/assets/img/pack-crm.svg",
  },
};

/** Cross-sell card sets shown on each product page */
export const OTHER_PRODUCTS: Record<string, Product[]> = {
  financial: [
    { ...PRODUCTS.payroll, title: "HRPhelo", packImg: "/assets/img/pack-payroll.svg", desc: "See how HRPhelo supports organisations across a wide range of industries." },
    { ...PRODUCTS.contract, title: "Customized Software", packImg: "/assets/img/pack-contract.svg", desc: "See how Datrix Customized Software supports organisations across a wide range of industries." },
    { ...PRODUCTS.crm, title: "MarketingPhelo", packImg: "/assets/img/pack-crm.svg", desc: "See how MarketingPhelo supports organisations across a wide range of industries." },
  ],
  payroll: [
    { ...PRODUCTS.financial, title: "AccountingPhelo", packImg: "/assets/img/pack-financial.svg", desc: "See how AccountingPhelo supports organisations across a wide range of industries." },
    { ...PRODUCTS.contract, title: "Customized Software", packImg: "/assets/img/pack-contract.svg", desc: "See how Datrix Customized Software supports organisations across a wide range of industries." },
    { ...PRODUCTS.crm, title: "MarketingPhelo", packImg: "/assets/img/pack-crm.svg", desc: "See how MarketingPhelo supports organisations across a wide range of industries." },
  ],
  contract: [
    { ...PRODUCTS.financial, title: "AccountingPhelo", packImg: "/assets/img/pack-financial.svg", desc: "See how AccountingPhelo supports organisations across a wide range of industries." },
    { ...PRODUCTS.payroll, title: "HRPhelo", packImg: "/assets/img/pack-payroll.svg", desc: "See how HRPhelo supports organisations across a wide range of industries." },
    { ...PRODUCTS.crm, title: "MarketingPhelo", packImg: "/assets/img/pack-crm.svg", desc: "See how MarketingPhelo supports organisations across a wide range of industries." },
  ],
  crm: [
    { ...PRODUCTS.financial, title: "AccountingPhelo", packImg: "/assets/img/pack-financial.svg", desc: "See how AccountingPhelo supports organisations across a wide range of industries." },
    { ...PRODUCTS.payroll, title: "HRPhelo", packImg: "/assets/img/pack-payroll.svg", desc: "See how HRPhelo supports organisations across a wide range of industries." },
    { ...PRODUCTS.contract, title: "Customized Software", packImg: "/assets/img/pack-contract.svg", desc: "See how Datrix Customized Software supports organisations across a wide range of industries." },
  ],
};

export interface MapMarker {
  name: string;
  latitude: number;
  longitude: number;
}

// Ghana only — per brand request the map carries a single market
export const MAP_MARKERS: MapMarker[] = [
  { name: "Ghana", latitude: 7.8984774, longitude: -3.2749691 },
];

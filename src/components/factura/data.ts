export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "“I am finding more and more use for Datrix every day. I am amazed at how powerful the application can be and I have no hesitation in recommending it to others that are looking for the right software for their business”",
    name: "Prince Andrews L.Zutah",
    role: "Head of IT, Bisvel Group of Companies",
  },
  {
    quote:
      "“We’re consistently amazed by the flexibility and simplicity of Datrix. Our initial experience was in provisioning the desktop version. We migrated to Datrix Web for our clients and Project accounting, group consolidated reports etc. has been made simple. It is now an integral part of our solutions provided for our client businesses”",
    name: "Martin Owusu",
    role: "Head Application Development & Business Services – Qualtek Limited -Ghana",
  },
  {
    quote: "“In case I haven't said it enough already, I LOVE Datrix”",
    name: "Inna Oleksiichuk",
    role: "Director, MilaVitsa",
  },
  {
    quote: "“Datrix makes accounting needs so quick and easy”",
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
    title: "Financials",
    desc: "Datrix is online accounting software for your business.",
    packImg: "/assets/img/pack-payroll.svg",
  },
  payroll: {
    slug: "/payroll",
    label: "HRMS",
    className: "payroll",
    title: "HRMS",
    desc: "Datrix HRMS is an innovative system for easy management of Payroll and HR for small to medium and large organization.",
    packImg: "/assets/img/pack-payroll.svg",
  },
  contract: {
    slug: "/contract",
    label: "Customized Software",
    className: "contract",
    title: "Customized Software",
    desc: "Datrix designs bespoke software around your exact workflows — web, mobile and integrations you fully own.",
    packImg: "/assets/img/pack-contract.svg",
  },
  crm: {
    slug: "/crm",
    label: "CRM",
    className: "crm",
    title: "CRM",
    desc: "Datrix CRM manages your sales pipeline, stay on top of employee activities, and close more deals.",
    packImg: "/assets/img/pack-crm.svg",
  },
};

/** "Check out our other products" card sets, exactly as on each page */
export const OTHER_PRODUCTS: Record<string, Product[]> = {
  financial: [
    { ...PRODUCTS.payroll, title: "Datrix HRMS", packImg: "/assets/img/pack-payroll.svg", desc: "Learn how Datrix HRMS helps businesses from different industries." },
    { ...PRODUCTS.contract, title: "Customized Software", packImg: "/assets/img/pack-contract.svg", desc: "Learn how Datrix Customized Software helps businesses from different industries." },
    { ...PRODUCTS.crm, title: "Datrix CRM", packImg: "/assets/img/pack-crm.svg", desc: "Learn how Datrix CRM helps businesses from different industries." },
  ],
  payroll: [
    { ...PRODUCTS.financial, title: "Datrix Financial", packImg: "/assets/img/pack-payroll.svg", desc: "Learn how Datrix Financial helps businesses from different industries." },
    { ...PRODUCTS.contract, title: "Customized Software", packImg: "/assets/img/pack-contract.svg", desc: "Learn how Datrix Customized Software helps businesses from different industries." },
    { ...PRODUCTS.crm, title: "Datrix CRM", packImg: "/assets/img/pack-crm.svg", desc: "Learn how Datrix CRM helps businesses from different industries." },
  ],
  contract: [
    { ...PRODUCTS.financial, title: "Datrix Financial", packImg: "/assets/img/pack-payroll.svg", desc: "Learn how Datrix Financial helps businesses from different industries." },
    { ...PRODUCTS.payroll, title: "Datrix HRMS", packImg: "/assets/img/pack-payroll.svg", desc: "Learn how Datrix HRMS helps businesses from different industries." },
    { ...PRODUCTS.crm, title: "Datrix CRM", packImg: "/assets/img/pack-crm.svg", desc: "Learn how Datrix CRM helps businesses from different industries." },
  ],
  crm: [
    { ...PRODUCTS.financial, title: "Datrix Financial", packImg: "/assets/img/pack-payroll.svg", desc: "Learn how Datrix Financial helps businesses from different industries." },
    { ...PRODUCTS.payroll, title: "Datrix HRMS", packImg: "/assets/img/pack-payroll.svg", desc: "Learn how Datrix HRMS helps businesses from different industries." },
    { ...PRODUCTS.contract, title: "Customized Software", packImg: "/assets/img/pack-contract.svg", desc: "Learn how Datrix Customized Software helps businesses from different industries." },
  ],
};

export interface MapMarker {
  name: string;
  email: string;
  latitude: number;
  longitude: number;
}

export const MAP_MARKERS: MapMarker[] = [
  { name: "Ghana", email: "africa@datrixtechsolutions.com", latitude: 7.8984774, longitude: -3.2749691 },
  { name: "Nigeria", email: "africa@datrixtechsolutions.com", latitude: 9.0065062, longitude: 4.1795106 },
  { name: "Kenya", email: "africa@datrixtechsolutions.com", latitude: 0.1540843, longitude: 33.4099521 },
  { name: "Sierra Leone", email: "africa@datrixtechsolutions.com", latitude: 8.420697, longitude: -12.9588643 },
  { name: "Liberia", email: "africa@datrixtechsolutions.com", latitude: 6.4059651, longitude: -11.6970099 },
  { name: "Rwanda", email: "africa@datrixtechsolutions.com", latitude: -1.9435638, longitude: 29.3199475 },
  { name: "UAE", email: "uae@datrixtechsolutions.com", latitude: 23.7680866, longitude: 53.979308 },
  { name: "Baharain", email: "baharain@datrixtechsolutions.com", latitude: 26.0865374, longitude: 50.5227181 },
  { name: "Bangladesh", email: "bangladesh@datrixtechsolutions.com", latitude: 23.7286471, longitude: 90.1296852 },
  { name: "INDIA", email: "india@datrixtechsolutions.com", latitude: 21.493825, longitude: 78.1573341 },
];

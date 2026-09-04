"use client";

import React, { useEffect, useRef, useState } from "react";
import SlickSlider from "./../SlickSlider";
import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const CHECKLIST = [
  "Comprehensive and flexible features to track the flow of money in and out of your company in a secure and accurate environment.",
  "Instant access to all your financial data, from summary views to transaction-level drill-down details.",
  "Track all accounting activity with general ledger and generate financial statements, reports & budgets.",
  "Highly customizable fields, easy to navigate menus and grids integrated with advanced search capabilities make complicated finance process accessible to anyone.",
];

const FEATURE_SLIDES = [
  {
    img: "/assets/img/page-financials/screen-Accounting-Screenshot.jpg",
    title: "Accounting",
    blocks: [
      {
        p: "AccountingPhelo provides an integrated way to bank, invoice and manage your company finances.",
      },
      {
        h: "AccountingPhelo gives you full control!",
        p: "Take full control over your accounting and payroll* information with real-time visibility on bank balances, sales, upcoming bills, profitability and KPI’s.",
      },
    ],
  },
  {
    img: "/assets/img/page-financials/screen-Inventory-Screenshot.jpg",
    title: "Inventory",
    blocks: [
      {
        p: "AccountingPhelo’s sophisticated procurement, fulfillment and inventory management software allows you to record, analyse and report on your inventory, helping you manage your stock position and cost.",
      },
      {
        h: "Sophisticated & Real-Time!",
        p: "AccountingPhelo’s sophisticated procurement, fulfillment and inventory management software allows you to record, analyze and report on your inventory, helping you manage your stock position and cost. Enjoy full stock visibility in real-time too.",
      },
    ],
  },
  {
    img: "/assets/img/page-financials/screen-sales-purchase.jpg",
    title: "Sales & Purchase",
    blocks: [
      {
        p: "AccountingPhelo allows you to create sales automation workflows to proactively manage your sales.",
      },
      {
        h: "Effectively drive sales performance",
        p: "Sales staff can create quotes (which convert to sales orders and invoices), based on standard items and pricing in the system.",
      },
      {
        h: "Track, Report & Visualise",
        p: "It tracks operational and financial data—by the business driver—to give you superior reporting power and a complete view of your organization. Create any kind of report, dashboard, or visualization you want—with exactly the metrics that matter",
      },
    ],
  },
  {
    img: "/assets/img/page-financials/screen-pos.jpg",
    title: "Order & POS",
    blocks: [
      {
        p: "Streamline and manage your order fulfillment and returns effectively by using AccountingPhelo’s embedded business processes.",
      },
      {
        h: "The perfect POS software solution",
        p: "Keep track of inventory across multiple stores, seamless syncing of stock. Use automated reordering based on specified stock levels, and adjust reorder points and restock levels to make sure you never have too much or too little stock on your shelves.",
      },
      {
        h: "Quick Inventory Lookups",
        p: "Move stock between stores or your warehouse with stock transfers, and quickly perform inventory lookups across all your sales channels.",
      },
    ],
  },
  {
    img: "/assets/img/page-financials/screen-Business-Intelligrnce.jpg",
    title: "Business Intelligence & Productivity",
    blocks: [
      {
        p: "AccountingPhelo includes numerous productivity tools to let you run your business more effectively and efficiently – increasing your profitability.",
      },
      {
        h: "Sophisticated and Customizable Dashboards",
        p: "Get real-time visibility across the business including bank balances, sales, upcoming bills, profitability and KPIs with AccountingPhelo’s business intelligence software.",
      },
      {
        h: "Value-Added Insights",
        p: "Understand true value-added insights and gain instant visibility to identify issues, trends, and opportunities and immediately drill down to the underlying transaction and take action.",
      },
    ],
  },
];

const REPORTS = [
  {
    img: "features-accounting.svg",
    title: "Project Accounting",
    text: "Start and finish projects on time, stay on top of project costs and revenue, and keep projects productive and profitable.",
  },
  {
    img: "features-multi-curr.svg",
    title: "Multi Currency",
    text: "Easy multi-currency accounting. Create invoices, reconcile accounts and get paid in any currency.",
  },
  {
    img: "features-approval-work.svg",
    title: "Approval Workflow",
    text: "Simple, multi-level approvals for any transaction. Approval process can be triggered based on the value of the transaction.",
  },
  {
    img: "features-multi-comp.svg",
    title: "Multi Companies / Group Consolidation",
    text: "AccountingPhelo makes it easy to manage the financials for multiple entities, whether your business structure is simple or complex, domestic or global.",
  },
  {
    img: "features-profit-cntr.svg",
    title: "Cost / Profit Centre",
    text: "Dimensions can do many things for any organization running AccountingPhelo. They allow a company to have a very simple chart of accounts, while maintaining the ability to report and analyze data on multiple different levels and criteria.",
  },
  {
    img: "features-bank-reconcile.svg",
    title: "Bank Reconciliation",
    text: "Easily reconcile your bank statement against your bank account register to keep your AccountingPhelo account accurate.",
  },
  {
    img: "features-budget-wth-variance.svg",
    title: "Budgets with Variance Analysis",
    text: "Taking care of the budgeting process is no longer a challenging task with AccountingPhelo’s powerful and intuitive Budgeting feature.",
  },
  {
    img: "features-depreciation.svg",
    title: "Fixed Assets",
    text: "Fixed assets in AccountingPhelo help you keep track of business assets that are depreciated over time. That depreciation expense can be claimed as a tax benefit.",
  },
];

const TABLE_ROWS = [
  "Accounts & Inventory",
  "Budgets",
  "Comprehensive Fixed Assets",
  "Project Accounting",
  "Multilevel Approval Workflow & Via Email",
  "Analytics / BI Reports",
  "100% Feature Parity in Desktop & Web Versions",
  "Ability to Handle Large Data & Hundreds of Users with Blazing Speed",
];

const COMPARE: { name: string; ticks: boolean[] }[] = [
  { name: "AccountingPhelo", ticks: [true, true, true, true, true, true, true, true] },
  { name: "Tally", ticks: [true, true, false, false, true, false, true, true] },
  { name: "Troyee", ticks: [true, false, false, false, true, false, true, true] },
  { name: "Quickbooks", ticks: [true, false, true, true, false, false, true, true] },
];

const INDUSTRIES = [
  ["industries-Construction.svg", "Construction"],
  ["industries-Credit-Soc.svg", "Credit Society"],
  ["industries-Education.svg", "Educational Institutions"],
  ["industries-Manufacturing.svg", "Manufacturing"],
  ["industries-NGO.svg", "NGO"],
  ["industries-Oil-Gas.svg", "Oil & Gas"],
  ["industries-Retail.svg", "Retail / Trading"],
  ["industries-Transport.svg", "Transport / Rental"],
];

const SIDEBAR_LINKS = [
  ["#clients", "Clients"],
  ["#testimonials", "Testimonials"],
  ["#industries", "Industries"],
  ["#features", "Features"],
];

function FinancialFeatureScroller({ onRequestDemo }: { onRequestDemo: () => void }) {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImg, setActiveImg] = useState(FEATURE_SLIDES[0].img);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const src = (entry.target as HTMLElement).dataset.src;
            if (src) setActiveImg(src);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    contentRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="features sectionPadding" id="features">
      <div className="container">
        <h2 className="text-center">Features</h2>
        <div className="row position-relative" id="feature1">
          <div className="col-xs-12 col-sm-12 col-md-6 pl-4">
            <div
              className="summary row align-items-center height100"
              id="panImage"
            >
              <div className="col">
                <div className="desktop-screen desktop-img">
                  <img src={activeImg} alt="Feature screenshot" id="featureImg" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-5 offset-md-1">
            {FEATURE_SLIDES.map((slide, idx) => (
              <div
                key={slide.title}
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
                className="easyToMigratePadding row align-items-center feature-content height100"
                data-src={slide.img}
              >
                <div className="col">
                  <div className="desktop-screen mobile-img">
                    <img src={slide.img} alt={slide.title} />
                  </div>
                  <h3>{slide.title}</h3>
                  {slide.blocks.map((b, i) => (
                    <React.Fragment key={i}>
                      {b.h ? <h4>{b.h}</h4> : null}
                      <p>{b.p}</p>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FinancialPage({
  onRequestDemo,
}: {
  onRequestDemo: () => void;
}) {
  const scrollTo = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(hash.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <div className="wrapper">
      <div className="sidebar-navbar">
        <ul className="nav">
          {SIDEBAR_LINKS.map(([hash, label]) => (
            <li key={hash}>
              <a href={hash} onClick={scrollTo(hash)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section className="financial-banner topBannerSection">
        <div className="container">
          <div className="row align-items-center height100">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="factura-intro">
                <img src="/assets/img/Financials.svg" className="mobile-img" alt="" />
                <h1 className="mb-3">
                  AccountingPhelo is online accounting
                  <br />
                  software for your business.
                </h1>
                <p className="paragraph2 mb-4">
                  See why more than 6,000 users choose AccountingPhelo.
                </p>
                <a
                  href="#"
                  className="request-btn big financial"
                  onClick={(e) => {
                    e.preventDefault();
                    onRequestDemo();
                  }}
                >
                  Request A Demo
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 p0">
              <div className="main-illustration desktop-img">
                <video className="videos" autoPlay loop muted playsInline>
                  <source src="/assets/vid/finance.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overview sectionPadding bgGray">
        <div className="container">
          <div className="row mb-5">
            <div className="col-sm-12 col-md-12">
              <h2 className="text-center">Why AccountingPhelo?</h2>
              <p>
                Automate all finance processes with AccountingPhelo. Its
                comprehensive and flexible financial management features allow
                you to track the flow of money in and out of your company in a
                secure and accurate environment. Sophisticated functionality
                streamlines transactions and provides instant access to all
                your financial data, from summary views to transaction-level
                drill-down details. Track all accounting activity with
                AccountingPhelo's general ledger and easily generate financial
                statements, budgets and other advanced financial reports. With
                highly customizable fields, easy to navigate menus and grids
                integrated with advanced search capabilities AccountingPhelo
                makes complicated finance process accessible to anyone who can
                operate a computer. Here’s delivering the power of meaningful
                data at the click of a button, the foolproof way of lending
                your business a huge strategic advantage over others.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img src="/assets/img/page-financials/automate-finance.svg" alt="Automate Finance" />
            </div>
            <div className="col-md-7 ml-auto">
              <h2>Automate Finance with AccountingPhelo</h2>
              <ul className="checklist">
                {CHECKLIST.map((c, i) => (
                  <li key={i}>
                    <span className="color fa-check-circle"></span>
                    {c}
                  </li>
                ))}
                <li>
                  <span className="color fa-check-circle"></span>
                  <p style={{ display: "inline" }}>
                    Here’s delivering the power of meaningful data at the click
                    of a button, the foolproof way of lending your business a
                    huge strategic advantage over others.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinancialFeatureScroller onRequestDemo={onRequestDemo} />

      <section className="financial-features-points mb80 features-points">
        <div className="container">
          <h2 className="text-center">
            Over 150+ reports with many customization options
          </h2>
          <div className="row mb-5 mt5">
            {REPORTS.map((r) => (
              <div className="col-md-3" key={r.title}>
                <img
                  src={`/assets/img/page-financials/${r.img}`}
                  alt={r.title}
                  className="mb-4"
                />
                <h3 className="mainHeading3">{r.title}</h3>
                <p className="">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="financial-table-section height100">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="position-relative financial-table">
                <div className="d-inline-flex position-absolute">
                  <ul className="text-left" style={{ width: "auto" }}>
                    <li style={{ backgroundColor: "transparent" }} className="mt-3 p-3"></li>
                    {TABLE_ROWS.map((row) => (
                      <li className="mt-1 p-2" key={row}>
                        {row}
                      </li>
                    ))}
                  </ul>
                  {COMPARE.map((col) => (
                    <ul className="text-center" key={col.name}>
                      <li
                        className={`p-2 colorWhite${col.name === "AccountingPhelo" ? " active" : ""}`}
                        style={col.name === "AccountingPhelo" ? { height: 77 } : undefined}
                      >
                        {col.name}
                      </li>
                      {col.ticks.map((tick, i) => (
                        <li className="p-2" key={i}>
                          <img src={`/assets/img/${tick ? "tick" : "cross"}.svg`} alt={tick ? "Yes" : "No"} />
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="clients bgGray" id="industries">
        <h2 className="text-center mb-4">Industries</h2>
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <SlickSlider
                className="industies-slider"
                settings={{
                  slidesToShow: 7,
                  dots: true,
                  autoplay: true,
                  autoplaySpeed: 2000,
                }}
                responsive={[
                  { breakpoint: 1024, settings: { slidesToShow: 6 } },
                  { breakpoint: 768, settings: { slidesToShow: 4 } },
                  { breakpoint: 480, settings: { slidesToShow: 2 } },
                ]}
              >
                {INDUSTRIES.map(([img, label]) => (
                  <div key={label}>
                    <a href="" className="industries-icon" onClick={(e) => e.preventDefault()}>
                      <img src={`/assets/img/page-financials/${img}`} alt={label} />
                    </a>
                    <p>{label}</p>
                  </div>
                ))}
              </SlickSlider>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial2 sectionPadding" id="testimonials">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-md-center">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <ProductTestimonialSlider />
            </div>
          </div>
        </div>
      </section>

      <section className="clients" id="clients">
        <h2 className="text-center mb-4">Trusted By</h2>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <ClientsSlider logos={HOME_CLIENTS} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

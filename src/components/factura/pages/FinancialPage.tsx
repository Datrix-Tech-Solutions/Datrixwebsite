"use client";

import React, { useEffect, useRef, useState } from "react";
import SlickSlider from "./../SlickSlider";
import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const CHECKLIST = [
  "Rich, flexible features that follow every fund moving in or out of your company within a secure, accurate environment.",
  "Immediate reach into all your financial data, from broad summaries down to single-transaction detail.",
  "Monitor every accounting entry through the general ledger and produce statements, reports and budgets with ease.",
  "Deeply customizable fields, intuitive menus and grids, and built-in advanced search make even complex finance tasks simple for anyone.",
];

const FEATURE_SLIDES = [
  {
    img: "/assets/img/page-financials/screen-Accounting-Screenshot.jpg",
    title: "Accounting",
    blocks: [
      {
        p: "AccountingPhelo brings banking, invoicing and company finances together in one integrated flow.",
      },
      {
        h: "AccountingPhelo puts you firmly in charge!",
        p: "Direct your accounting and payroll* information with live visibility of bank balances, sales, upcoming bills, profitability and KPIs.",
      },
    ],
  },
  {
    img: "/assets/img/page-financials/screen-Inventory-Screenshot.jpg",
    title: "Inventory",
    blocks: [
      {
        p: "With AccountingPhelo’s advanced procurement, fulfillment and inventory management, you can record, analyse and report on stock — keeping your stock position and cost firmly under control.",
      },
      {
        h: "Advanced & Always Live!",
        p: "AccountingPhelo’s advanced procurement, fulfillment and inventory tooling lets you record, analyse and report on your stock, keeping positions and costs in check — with complete visibility of every item in real time.",
      },
    ],
  },
  {
    img: "/assets/img/page-financials/screen-sales-purchase.jpg",
    title: "Sales & Purchase",
    blocks: [
      {
        p: "Build sales automation workflows in AccountingPhelo and stay ahead of your sales instead of chasing them.",
      },
      {
        h: "Push sales performance further",
        p: "Your sales team can raise quotes from the system’s standard items and pricing, converting them into sales orders and invoices in a click.",
      },
      {
        h: "Measure, Report & Visualise",
        p: "Operational and financial data is tracked against each business driver, giving you stronger reporting power and a full picture of your organization. Build any report, dashboard or visualization you need — with precisely the metrics that matter.",
      },
    ],
  },
  {
    img: "/assets/img/page-financials/screen-pos.jpg",
    title: "Order & POS",
    blocks: [
      {
        p: "AccountingPhelo’s built-in business processes keep order fulfillment and returns flowing smoothly.",
      },
      {
        h: "A POS solution that just fits",
        p: "Follow inventory across every store with stock syncing seamlessly in the background. Automated reordering keyed to your set stock levels — with adjustable reorder and restock points — means shelves are never over- or under-stocked.",
      },
      {
        h: "Inventory Lookups in Seconds",
        p: "Shift stock between stores or the warehouse using stock transfers, and run fast inventory lookups across every sales channel.",
      },
    ],
  },
  {
    img: "/assets/img/page-financials/screen-Business-Intelligrnce.jpg",
    title: "Business Intelligence & Productivity",
    blocks: [
      {
        p: "AccountingPhelo ships with a wealth of productivity tools that help you run the business sharper — and lift profitability.",
      },
      {
        h: "Powerful, Personalised Dashboards",
        p: "AccountingPhelo’s business intelligence gives you live sight of the whole business — bank balances, sales, upcoming bills, profitability and KPIs.",
      },
      {
        h: "Insights That Add Value",
        p: "Gain genuine value-added insight with instant visibility that surfaces issues, trends and opportunities — then drill straight to the underlying transaction and act.",
      },
    ],
  },
];

const REPORTS = [
  {
    img: "features-accounting.svg",
    title: "Project Accounting",
    text: "Deliver projects on schedule, watch project costs and revenue closely, and keep every project productive and profitable.",
  },
  {
    img: "features-multi-curr.svg",
    title: "Multi Currency",
    text: "Effortless multi-currency accounting — invoice, reconcile and get paid in whatever currency you choose.",
  },
  {
    img: "features-approval-work.svg",
    title: "Approval Workflow",
    text: "Straightforward multi-level approvals for any transaction, triggered automatically by transaction value.",
  },
  {
    img: "features-multi-comp.svg",
    title: "Multi Companies / Group Consolidation",
    text: "Managing finances across several entities is simple with AccountingPhelo — whatever the shape of your structure, local or worldwide.",
  },
  {
    img: "features-profit-cntr.svg",
    title: "Cost / Profit Centre",
    text: "Dimensions give AccountingPhelo users remarkable flexibility: keep a very simple chart of accounts while still reporting and analysing data across many levels and criteria.",
  },
  {
    img: "features-bank-reconcile.svg",
    title: "Bank Reconciliation",
    text: "Match your bank statement against your account register in a few clicks and keep your AccountingPhelo books spot on.",
  },
  {
    img: "features-budget-wth-variance.svg",
    title: "Budgets with Variance Analysis",
    text: "Budgeting stops being a chore thanks to AccountingPhelo’s powerful, intuitive budgeting feature.",
  },
  {
    img: "features-depreciation.svg",
    title: "Fixed Assets",
    text: "Track every depreciating business asset in AccountingPhelo — and claim the depreciation expense as a tax benefit.",
  },
];

const TABLE_ROWS = [
  "Accounts & Inventory",
  "Budgets",
  "Full Fixed Assets Coverage",
  "Project Accounting",
  "Multi-Level Approvals, Including by Email",
  "Analytics / BI Reports",
  "Identical Features on Desktop & Web",
  "Handles Huge Data Volumes & Hundreds of Users at Speed",
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
                <img src="/assets/img/hero/financial.svg" className="mobile-img" alt="" />
                <h1 className="mb-3">
                  AccountingPhelo — online accounting
                  <br />
                  built for your business.
                </h1>
                <p className="paragraph2 mb-4">
                  Discover why over 6,000 users run on AccountingPhelo.
                </p>
                <a
                  href="#"
                  className="request-btn big financial"
                  onClick={(e) => {
                    e.preventDefault();
                    onRequestDemo();
                  }}
                >
                  Book a Demo
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 p0">
              <div className="main-illustration desktop-img">
                <img
                  src="/assets/img/hero/financial.svg"
                  className="hero-art"
                  alt="AccountingPhelo — online accounting dashboard, illustrated"
                />
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
                Run every finance process automatically with AccountingPhelo.
                Its broad, flexible financial management toolkit lets you
                follow the money moving in and out of your company inside a
                secure, accurate environment. Sophisticated functionality
                smooths each transaction and puts all your financial data
                within instant reach, from high-level summaries down to
                individual transactions. Monitor every accounting entry
                through AccountingPhelo’s general ledger and produce
                statements, budgets and advanced financial reports without
                effort. Thanks to deeply customizable fields, intuitive menus
                and grids with advanced search built in, AccountingPhelo
                makes complex finance work manageable for anyone who can use
                a computer. Meaningful data delivered at the click of a
                button — a sure-fire way to hand your business a major
                strategic edge over the competition.
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
              <h2>Let AccountingPhelo Automate Your Finance</h2>
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
                    Meaningful data delivered at the click of a button — a
                    sure-fire way to hand your business a major strategic
                    edge over the competition.
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
            More than 150+ reports, extensively customisable
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

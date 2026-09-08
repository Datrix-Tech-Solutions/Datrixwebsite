"use client";

import React from "react";
import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const CRM_FEATURES = [
  {
    title: "Account & Contact Management",
    text: "See every customer in full — activity history, key contacts, communications and internal account discussions in one view.",
  },
  {
    title: "Lead Management",
    text: "Follow each lead from first click to close while fine-tuning campaigns across every channel — and put your marketing dollars where they work hardest.",
  },
  {
    title: "Opportunities Management",
    text: "Opportunity Management lays out your team’s entire deal flow — stage, products, competition, quotes and beyond — keeping you close to the people and information that seal every sale.",
  },
  {
    title: "Quotation Management",
    text: "Reps pick the right items for every customer, every time, with consistent pricing and discounting — plus approvals exactly when they’re needed — even as quote volumes climb.",
  },
  {
    title: "Reports & Analytics",
    text: "Dashboards show the business at a glance in real time; anyone can build the detailed reports beneath them, reachable from anywhere.",
  },
  {
    title: "Territory Management",
    text: "Shape sales territories into a logical, flexible structure that pairs the right reps with the right customers for maximum revenue.",
  },
  {
    title: "Campaign Management",
    text: "Reach your contacts with polished email campaigns that take almost no effort to create, target and send.",
  },
  {
    title: "Intelligent Workflows",
    text: "Turn website form submissions into leads and contacts automatically",
  },
  {
    title: "Survey",
    text: "Collect feedback from customers and leads — every response is tied to the customer’s email address.",
  },
];

const CRM_COUNTERS = [
  { img: "investing-CRM.svg", text: "Of top-performing companies are putting money into CRM." },
  { img: "sales-increased.svg", text: "Sales grew by as much as 80%" },
  { img: "customer-retention.svg", text: "Of users say CRM made a real difference to customer retention." },
];

export default function CrmPage({
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
          <li>
            <a href="#clients" onClick={scrollTo("#clients")}>Clients</a>
          </li>
          <li>
            <a href="#testimonials" onClick={scrollTo("#testimonials")}>Testimonials</a>
          </li>
          <li>
            <a href="#features" onClick={scrollTo("#features")}>Features</a>
          </li>
        </ul>
      </div>

      <section className="crm-banner topBannerSection">
        <div className="container">
          <div className="row align-items-center height100 pb-5">
            <div className="col-xs-12 col-sm-12 col-md-5">
              <div className="factura-intro">
                <img src="/assets/img/hero/crm.svg" className="mobile-img" alt="" />
                <h1 className="mb-3">
                  CRM Built for Lifelong Customer Bonds
                </h1>
                <p className="paragraph2 mb-4">
                  Keep your sales pipeline moving, track team activity and
                  win more deals.
                </p>
                <a
                  href="#"
                  className="request-btn big crm"
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
                  src="/assets/img/hero/crm.svg"
                  className="hero-art"
                  alt="MarketingPhelo — CRM sales pipeline, illustrated"
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
              <h2 className="text-center">Why MarketingPhelo?</h2>
              <p style={{ textAlign: "justify" }}>
                Raise customer satisfaction, deepen retention and expand
                sales rapidly with MarketingPhelo — the strategic CRM that
                equips your Sales, Marketing and Customer Support teams. A
                transparent system that’s fully customisable and
                exceptionally easy to use keeps everyone aligned while
                training time drops to a minimum. The right CRM can
                transform a business: internal communication flows,
                productivity climbs, deal conversion improves and customers
                stay happy. MarketingPhelo gathers 360-degree customer
                knowledge onto one platform — phone, email, quotes, reports
                and complete activity history in a single place — so your
                sales team spends less time on tedious processes and more on
                what truly matters: selling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="payroll-checklist crm-checklist" id="features">
        <div className="container">
          <h2 className="text-center">Features</h2>
          <div className="row sectionPadding">
            {CRM_FEATURES.map((f) => (
              <div className="col-md-4" key={f.title}>
                <div className="checklist">
                  <span></span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contract-counter sectionPadding text-center">
        <div className="container">
          <div className="row">
            {CRM_COUNTERS.map((c) => (
              <div className="col-md-4" key={c.img}>
                <div className="crm-feature">
                  <img src={`/assets/img/page-crm/${c.img}`} alt="" />
                </div>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contract-lifecycle sectionPadding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-12">
              <h2>Why Does Your Business Need CRM?</h2>
              <div>
                <h3>Keeping every team in sync is hard</h3>
                <p>
                  We understand the struggle of keeping marketing, sales and
                  support teams organised, productive and truly in sync.
                </p>
              </div>
              <div>
                <h3>Your data lives everywhere but one place</h3>
                <p>
                  When customer data and interactions are strewn across
                  countless apps, collaboration suffers, customer experiences
                  lose their spark and revenue growth stalls.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 m-auto">
              <div>
                <img src="/assets/img/page-crm/why-need-CRM.svg" alt="Why you need CRM" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contract-form-section height100" id="industries">
        <div className="container">
          <div className="row sectionPadding">
            <div className="col-xs-12 col-sm-12 col-md-6 m-auto">
              <div>
                <img src="/assets/img/page-crm/why-CRM.svg" alt="Why MarketingPhelo" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 ml-auto">
              <h2>Why MarketingPhelo?</h2>
              <div>
                <h3>Flexible</h3>
                <p>
                  Quick, painless configuration shapes a custom CRM that hands
                  every customer-facing teammate the information and tools
                  they need.
                </p>
              </div>
              <div>
                <h3>Affordable</h3>
                <p>
                  MarketingPhelo’s low, predictable pricing lets you grow a
                  CRM that backs your big ideas rather than capping them.
                </p>
              </div>
              <div>
                <h3>Tailored</h3>
                <p>
                  A CRM solution fitted to your small business through our
                  customization, configuration, integration and deployment
                  options.
                </p>
              </div>
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
        <h2 className="text-center">Trusted By</h2>
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

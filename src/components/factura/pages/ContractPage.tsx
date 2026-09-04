"use client";

import React from "react";
import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const FEATURES_GRID = [
  {
    img: "feature-tailored.svg",
    title: "Tailored To Your Workflows",
    text: "We study how your business actually operates and build software around it — not the other way round. Every screen, field and report is shaped by your real processes, so your team keeps working the way that already makes you successful, only faster and with fewer errors.",
  },
  {
    img: "feature-integration.svg",
    title: "Seamless Integrations",
    text: "Connect your new software with the tools you already rely on — Financials, HRMS, CRM, payment gateways and third-party APIs. Data flows automatically across your organisation, eliminating double capture and the errors that come with it.",
  },
  {
    img: "feature-scalable.svg",
    title: "Scales As You Grow",
    text: "Start with what you need today and add modules as you expand. A modular architecture means new features plug in cleanly without disrupting what already works — your software investment grows with your business, never against it.",
  },
  {
    img: "feature-security.svg",
    title: "Enterprise-Grade Security",
    text: "Role-based access control, encrypted data and full audit trails keep your business information protected at every level. Deploy in the cloud or on-premises, with hosting partners chosen for security, uptime and cost efficiency.",
  },
  {
    img: "feature-web-mobile.svg",
    title: "Web & Mobile Ready",
    text: "Responsive web applications and mobile apps mean your team can work from the office, the field or home — on any device. Approve requests, capture data and monitor the business wherever the day takes you.",
  },
  {
    img: "feature-analytics.svg",
    title: "Analytics & Reporting",
    text: "Dashboards and custom reports turn your raw business data into clear, actionable insight. Give management real visibility over performance, trends and exceptions — and make decisions based on facts, not guesswork.",
  },
  {
    img: "feature-support.svg",
    title: "Dedicated Support",
    text: "A dedicated development and support team stays with you long after launch — training your staff, answering questions and evolving the system as your needs change. You are never left alone with your software.",
  },
  {
    img: "feature-ownership.svg",
    title: "Complete Ownership",
    text: "You own your software outright — source code, documentation, data and licences — with no per-user lock-in. Your asset, your rules, your competitive advantage in the market.",
  },
];

const OFFERS = [
  "A solution shaped exactly around your business processes — not generic features you pay for but never use.",
  "One trusted partner from idea to launch. Datrix handles analysis, design, development, testing and deployment under a single roof.",
  "Full ownership of your software. Source code, documentation and data belong to you — no per-user lock-in, no vendor dependency.",
  "Seamless integration with the systems you already rely on, from accounting and payroll to payment gateways and third-party APIs.",
  "Cloud-based or on-premises deployments. Datrix partners with the most secure hosting providers to reduce your cost and burden on your IT organization.",
];

export default function ContractPage({
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
            <a href="#pricing" onClick={scrollTo("#pricing")}>Pricing</a>
          </li>
          <li>
            <a href="#features" onClick={scrollTo("#features")}>Features</a>
          </li>
        </ul>
      </div>

      <section className="financial-banner">
        <div className="container">
          <div className="row align-items-center height100 pb-5">
            <div className="col-xs-12 col-sm-12 col-md-5">
              <div className="factura-intro">
                <img src="/assets/img/customized.svg" className="mobile-img" alt="" />
                <h1 className="mb-3">
                  Customized Software,
                  <br />
                  Built For You.
                </h1>
                <ul className="contract-intro-points ml-4">
                  {[
                    "Tailored To Your Workflows",
                    "Web & Mobile Applications",
                    "Seamless Integrations",
                    "Scalable & Secure",
                  ].map((p) => (
                    <li key={p}>
                      <span className="fa-check"></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="request-btn big contract"
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
                <img
                  src="/assets/img/page-contract/customized-mockup.svg"
                  className="videos"
                  alt="Datrix customized software dashboard mockup"
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
              <h2 className="text-center">Why Datrix Customized Software?</h2>
              <p>
                Off-the-shelf software forces your business to adapt to the way
                it works — Datrix Customized Software does the opposite. We
                design and build solutions around your exact workflows, so your
                team keeps doing what it does best, only faster and with fewer
                errors. From the first workshop to the final handover, our
                analysts and engineers map your processes, agree every detail
                with you, and translate them into a secure, scalable
                application your staff will actually enjoy using. Because the
                solution is built to fit, training time shrinks to a minimum
                and adoption comes naturally. And as your business grows, the
                same platform grows with you — new modules, new integrations
                and new reports can be added at any time without starting over.
                You get software that fits today and is ready for tomorrow,
                with complete ownership of your code and your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contract-features sectionPadding" id="features">
        <div className="container">
          <h2 className="text-center">Features</h2>
          <div className="row sectionPadding">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="easyToMigratePadding">
                <h5 className="mainHeading5 mb-3">From Idea To Launch, End To End</h5>
                <p className="paragraph2">
                  One team takes your requirement from the first <br />
                  sketch to a live, fully supported product.
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6">
              <img
                src="/assets/img/page-contract/custom-flow.svg"
                alt="From idea to launch"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="features-points">
        <div className="container">
          <div className="row mb-5">
            {FEATURES_GRID.slice(0, 4).map((f) => (
              <div className="col-md-3" key={f.title}>
                <img
                  src={`/assets/img/page-contract/${f.img}`}
                  alt={f.title}
                  className="mb-3"
                />
                <h3 className="mainHeading3">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="row">
            {FEATURES_GRID.slice(4).map((f) => (
              <div className="col-md-3" key={f.title}>
                <img
                  src={`/assets/img/page-contract/${f.img}`}
                  alt={f.title}
                  className="mb-3"
                />
                <h3 className="mainHeading3">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contract-lifecycle">
        <div className="container">
          <div className="row sectionPadding align-items-center">
            <div className="col-md-6">
              <h2>Datrix Customized Software Offers</h2>
              <ul className="checklist">
                {OFFERS.map((c, i) => (
                  <li key={i}>
                    <span className="color fa-check-circle"></span> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-5 ml-auto">
              <img src="/assets/img/page-contract/delivery-process.svg" alt="Our delivery process" />
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

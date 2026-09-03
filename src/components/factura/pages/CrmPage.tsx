"use client";

import React from "react";
import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const CRM_FEATURES = [
  {
    title: "Account & Contact Management",
    text: "Have a complete view of your customers, including activity history, key contacts, customer communications, and internal account discussions.",
  },
  {
    title: "Lead Management",
    text: "Track your leads from click to close, while continually optimising your campaigns across every channel. Make smarter decisions about where to invest your marketing dollars.",
  },
  {
    title: "Opportunities Management",
    text: "Get a complete view of your team’s deals with Opportunity Management. See stage, products, competition, quotes, and more. Stay connected to the people and information you need to close every sale.",
  },
  {
    title: "Quotation Management",
    text: "Let sales reps select the right items for each customer, every time. Get consistent pricing and discounting — and approvals when you need them — even as reps send out more quotes.",
  },
  {
    title: "Reports & Analytics",
    text: "Dashboards offer a real-time picture of your business at a glance. Dig deeper with detailed reports that anyone can create. And access your reports and dashboards from anywhere.",
  },
  {
    title: "Territory Management",
    text: "Model your sales territories into a logical and flexible structure that maps the right sales reps to the right customers to maximise revenue.",
  },
  {
    title: "Campaign Management",
    text: "Engage your contacts with beautiful email that's effortless to build, target and send.",
  },
  {
    title: "Intelligent Workflows",
    text: "Automatically create leads and contacts from website form submissions",
  },
  {
    title: "Survey",
    text: "Get feedback from your customers and leads. Responses are tied to email addresses of your Customers.",
  },
];

const CRM_COUNTERS = [
  { img: "investing-CRM.svg", text: "Of the top performing companies are investing in CRM." },
  { img: "sales-increased.svg", text: "Sales increased by 80%" },
  { img: "customer-retention.svg", text: "Of the users stated that CRM impacted customer retention." },
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
                <img src="/assets/img/CRM.svg" className="mobile-img" alt="" />
                <h1 className="mb-3">
                  CRM For Lifelong Customer Relationships
                </h1>
                <p className="paragraph2 mb-4">
                  Manage your sales pipeline, stay on top of employee
                  activities, and close more deals.
                </p>
                <a
                  href="#"
                  className="request-btn big crm"
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
                  <source src="/assets/vid/crm.mp4" type="video/mp4" />
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
              <h2 className="text-center">Why MarketingPhelo?</h2>
              <p style={{ textAlign: "justify" }}>
                Improve Customer satisfaction, increase retention and grow
                sales exponentially with MarketingPhelo - the strategic
                customer relationship management tool empowering your Sales,
                Marketing and Customer Support teams. Keep everything on the
                same page using a transparent system that’s fully customisable
                and extremely user friendly reducing training time to a
                minimum. A CRM system can do miracles for your business. It
                can make internal communication a breeze, it boosts
                productivity, makes way for increased deal conversion rates and
                keeps your customers happy. MarketingPhelo offers 360-degree
                customer knowledge on a single platform, bringing phone, email,
                quotes, reports and all activity history available at one place
                giving your sales team to reduce its involvement in tedious
                processes while it focuses on what’s actually important –
                selling.
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
              <h2>Why Do You Need CRM ?</h2>
              <div>
                <h3>Keeping teams in-sync is hard</h3>
                <p>
                  We know how hard it is to keep your marketing, sales and
                  support teams organized, productive and in sync.
                </p>
              </div>
              <div>
                <h3>Your data is all over the place</h3>
                <p>
                  Customer data and interactions scattered across many apps can
                  hinder your team’s ability to collaborate, craft engaging
                  customer experiences and grow revenue.
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
              <h2>Why MarketingPhelo ?</h2>
              <div>
                <h3>Flexible</h3>
                <p>
                  Fast, simple configuration gives your business a custom CRM
                  that provides everyone who faces the customer with the
                  information and tools they need.
                </p>
              </div>
              <div>
                <h3>Affordable</h3>
                <p>
                  With MarketingPhelo’s low, predictable pricing, you can build
                  a CRM system that supports your big ideas, instead of
                  limiting them.
                </p>
              </div>
              <div>
                <h3>Tailored</h3>
                <p>
                  CRM solutions for your small business with our
                  customization, configuration, integration and deployment
                  features
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

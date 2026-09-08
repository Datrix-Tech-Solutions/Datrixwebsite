"use client";

import React, { useState } from "react";
import SlickSlider from "./../SlickSlider";
import WorldMap from "./../WorldMap";
import { HomeTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const SERVICE_TABS = [
  {
    id: "financials",
    label: "Financials",
    img: "/assets/img/Financials.svg",
    title: "AccountingPhelo",
    text: "AccountingPhelo automates every finance process end to end. Rich yet flexible financial management features let you follow the money moving in and out of your company within a secure, accurate environment. Powerful functionality smooths each transaction and puts all your financial data within instant reach, from high-level summaries right down to individual transactions.",
    btn: "financial",
    href: "/financial",
  },
  {
    id: "hr",
    label: "HRMS",
    img: "/assets/img/payroll.svg",
    title: "HRPhelo",
    text: "HRPhelo automates your HR and Payroll routines and hands you back up to 70% of your time. Hosted as Software as a Service (SaaS), it needs no extra infrastructure or database — just set it up and manage payrolls and notifications while every sensitive employee record stays protected on one platform.",
    btn: "payroll",
    href: "/payroll",
  },
  {
    id: "contract",
    label: "Customized Software",
    img: "/assets/img/customized.svg",
    title: "Customized Software",
    text: "No two businesses work alike — your software shouldn’t either. Datrix designs and builds customized software around the way you actually operate, from bespoke web and mobile apps to integrations linking the systems you already depend on. One expert team walks with you from idea to launch, and you finish owning a secure, scalable solution that evolves with your business.",
    btn: "contract",
    href: "/contract",
  },
  {
    id: "CRM",
    label: "CRM",
    img: "/assets/img/CRM.svg",
    title: "MarketingPhelo",
    text: "Lift customer satisfaction, deepen retention and expand sales rapidly with MarketingPhelo — the strategic CRM that empowers your Sales, Marketing and Customer Support teams. A transparent, fully customisable and remarkably easy-to-use system keeps everyone on the same page while cutting training time to a minimum.",
    btn: "crm",
    href: "/crm",
  },
];

export default function HomePage({
  navigate,
}: {
  navigate: (to: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("financials");

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="wrapper">
      <section className="home-banner topBannerSection">
        <div className="container">
          <div className="row align-items-center height100">
            <div className="col-xs-12 col-sm-6 col-md-5">
              <div className="factura-intro">
                <img src="/assets/img/payroll.svg" className="mobile-img" alt="" />
                <h1>Smarter Ways to Run Your Business</h1>
                <p className="paragraph2">
                  WorkPhelo bundles every tool you need to run, track and
                  grow your business in one smart suite.
                </p>
                <a
                  href="#services"
                  className="smoothScroll request-btn big financial"
                  onClick={scrollToServices}
                >
                  Explore More
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 p0">
              <div className="main-illustration desktop-img">
                <video className="videos" autoPlay loop muted playsInline>
                  <source src="/assets/vid/Homepage-factura.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-services bgGray sectionPadding" id="services">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul
                className="nav service-tabs justify-content-center"
                id="myTab"
                role="tablist"
              >
                {SERVICE_TABS.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <a
                      className={`nav-link${activeTab === tab.id ? " active" : ""}`}
                      id={`${tab.id}-tab`}
                      role="tab"
                      aria-controls={tab.id}
                      aria-selected={activeTab === tab.id}
                      href={`#${tab.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(tab.id);
                      }}
                    >
                      {tab.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="myTabContent">
                {SERVICE_TABS.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tab-pane fade${
                      activeTab === tab.id ? " show active" : ""
                    }`}
                    id={tab.id}
                    role="tabpanel"
                    aria-labelledby={`${tab.id}-tab`}
                  >
                    <div className="row align-items-center">
                      <div className="col-md-7">
                        <div className="main-illustration">
                          <img src={tab.img} alt={tab.title} />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <h3>{tab.title}</h3>
                        <p>{tab.text}</p>
                        <a
                          href={`#${tab.href}`}
                          className={`request-btn big ${tab.btn}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(tab.href);
                          }}
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-reach sectionPadding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h3>A Global Reach</h3>
              <p>
                We work across the global business landscape and understand
                how much local context matters — it’s why Datrix is always
                close by. Wherever in the world you operate and whoever your
                customers are, Datrix delivers a hyper-local software
                solution that simplifies your processes, freeing you to
                focus on your people and pursue fresh ideas.
              </p>
              <p>
                We frequently act as advisors to our clients, guiding sound
                decisions that accelerate growth. Because WorkPhelo
                applications are faster, smaller and lighter, they’re
                simpler to deploy, install, maintain and upgrade —
                affordable technology assistance your business genuinely
                needs.
              </p>
            </div>
            <div className="col-md-8">
              <WorldMap />
            </div>
          </div>
        </div>
      </section>

      <section className="home-testimonial">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-md-center">
            <div className="col-md-8">
              <h3>What Our Clients Say</h3>
              <HomeTestimonialSlider />
            </div>
          </div>
        </div>
      </section>

      <section className="home-clients clients">
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

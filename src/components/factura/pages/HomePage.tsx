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
    title: "Financial Software",
    text: "Automate all finance processes with Factura Softwares. Its comprehensive and flexible financial management features allow you to track the flow of money in and out of your company in a secure and accurate environment. Sophisticated functionality streamlines transactions and provides instant access to all your financial data, from summary views to transaction-level drill-down details.",
    btn: "financial",
    href: "/financial",
  },
  {
    id: "hr",
    label: "HRMS",
    img: "/assets/img/payroll.svg",
    title: "HRMS Software",
    text: "Automate HR and Payroll processes and save 70% of your time. This Software as a Service (SaaS) hosted platform requires no additional infrastructure or database. Simply install and manage payrolls, notifications, and keep all sensitive employee information safe on the same platform.",
    btn: "payroll",
    href: "/payroll",
  },
  {
    id: "contract",
    label: "Contract",
    img: "/assets/img/contract.svg",
    title: "Contract Software",
    text: "Help your business reach the wide world without getting stuck in complex paper work and accounts keeping. Factura makes contract management a breeze by making contract lifecycle transparent, collaborative and clear. Factura’s Contract Software standardizes contract drafting and approval, giving you greater control and efficiency at every stage of the contract lifecycle.",
    btn: "contract",
    href: "/contract",
  },
  {
    id: "CRM",
    label: "CRM",
    img: "/assets/img/CRM.svg",
    title: "CRM Software",
    text: "Improve Customer satisfaction, increase retention and grow sales exponentially with Factura’s CRM software - the strategic customer relationship management tool empowering your Sales, Marketing and Customer Support teams. Keep everything on the same page using a transparent system that’s fully customisable and extremely user friendly reducing training time to a minimum.",
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
                <h1>Making Business Smarter</h1>
                <p className="paragraph2">
                  Factura is a complete suite of functionality tools for
                  managing your business smartly.
                </p>
                <a
                  href="#services"
                  className="smoothScroll request-btn big financial"
                  onClick={scrollToServices}
                >
                  Learn More
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
              <h3>Going Global</h3>
              <p>
                We operate in the global business landscape and understand the
                need to go local. This is why Factura is always near you. No
                matter which part of the world you are based in or who your
                customers are, Factura will have a hyper-local software
                solution to simplify your business processes, leaving you with
                more time to focus on humane aspects and initiate innovative
                thinking.
              </p>
              <p>
                We often play an advisory role for our clients helping them
                make the right decisions and hence accelerate growth. With a
                faster, smaller and lighter mechanism, Factura softwares are
                easier to deploy, install, maintain and upgrade. This is
                affordable technological assistance that your business needs.
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
              <h3>Words from our clients</h3>
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

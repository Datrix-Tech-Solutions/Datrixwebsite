"use client";

import React from "react";
import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const FEATURES_GRID = [
  {
    img: "feature-all-contract.svg",
    title: "All Contracts in One Place",
    text: "Have access to all of your contracts with all relevant information in one central place and easily view electronic copies of the original documents.",
  },
  {
    img: "feature-eliminate-approval.svg",
    title: "Eliminate Approval Bottlenecks",
    text: "With automatic notifications and one-click email* approvals. Our powerful business rules engine keeps your contract team running like a finely tuned machine.",
  },
  {
    img: "feature-secure-document.svg",
    title: "Secure Document Management",
    text: "Centrally store and manage all your contract and supplier documentation in one secure environment. Drag and drop spreadsheets, PDFs or other documents. No more looking through folders or spreadsheets in different places.",
  },
  {
    img: "feature-precise-settings.svg",
    title: "Precise Permission Settings",
    text: "Fine-grained security permissions means only the right people have access to each document. Define precise access controls for each user.",
  },
  {
    img: "feature-accurate-m-efficient.svg",
    title: "Accurate and Efficient Searching",
    text: "Search and export all supplier and contract data. With powerful search operators, you can slice and dice your way to that one Contract in your Contract Management Administration.",
  },
  {
    img: "feature-costing.svg",
    title: "Costing",
    text: "Easily split the contract cost within multiple companies, departments and sections, by number of users, percentage or fixed amount.",
  },
  {
    img: "feature-budgeting.svg",
    title: "Budgeting",
    text: "Keep contract costs under control by setting budgets for every company, department and section.",
  },
  {
    img: "feature-centralized-dashboard.svg",
    title: "Centralized Dashboards",
    text: "Dashboard with alerts, metrics, notice periods, owners and end dates.Search across the uploaded documents within seconds, no more manually locating that one clause in the contract*",
  },
];

const LIFECYCLE = [
  "Greater efficiency at every stage of contract lifecycle.",
  "Stay on top of autorenewals.",
  "Centralized storage and tracking for greater visibility. By centralizing contract storage and offering advanced reporting capabilities, Datrix Contract makes the entire contract lifecycle transparent, collaborative and clear.",
  "Improved collaboration capabilities and robust access controls. Assign granular access rights by user or user group to ensure your contracts and associated data are secure while improving collaboration with centralized review process.",
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
                <img src="/assets/img/contract.svg" className="mobile-img" alt="" />
                <h1 className="mb-3">
                  Contract Management
                  <br />
                  Made Simple.
                </h1>
                <ul className="contract-intro-points ml-4">
                  {[
                    "Multi-Level Approvals",
                    "Budgeting",
                    "Company/Department wise Costing",
                    "Payment Schedules & Reminders",
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
                <video className="videos" autoPlay loop muted playsInline>
                  <source src="/assets/vid/contract.mp4" type="video/mp4" />
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
              <h2 className="text-center">Why Datrix Contract?</h2>
              <p>
                Help your business reach the wide world without getting stuck
                in complex paper work and accounts keeping. Datrix makes
                contract management a breeze by making contract lifecycle
                transparent, collaborative and clear. Datrix’s Contract
                Software standardizes contract drafting and approval, giving
                you greater control and efficiency at every stage of the
                contract lifecycle. It further helps you manage the complete
                lifecycle of the contract and automates repeatable tasks. Save
                time and effort with easy search options, quick uploads, timely
                alerts, reminders, notifications and more with the highly user
                friendly and customizable Datrix software that give your
                business an all-round cover for Contract Management even
                providing insight to help you make better decisions.
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
                <h5 className="mainHeading5 mb-3">Never Miss A Deadline</h5>
                <p className="paragraph2">
                  We alert you anytime an important <br />
                  contract deadline is approaching.
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6">
              <img
                src="/assets/img/page-contract/feature-deadline.svg"
                alt="Never Miss A Deadline"
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
              <h2>Datrix Contract Offers</h2>
              <ul className="checklist">
                {LIFECYCLE.map((c, i) => (
                  <li key={i}>
                    <span className="color fa-check-circle"></span> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-5 ml-auto">
              <img src="/assets/img/page-contract/life-cycle.svg" alt="Contract lifecycle" />
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

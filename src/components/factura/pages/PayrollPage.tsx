"use client";

import React, { useState } from "react";
import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { PAYROLL_CLIENTS } from "./../data";

const BENEFITS = [
  {
    img: "feature-human-resource-management.svg",
    title: "Human Resource Management",
    text: "Effective HR System which Manages employees from hiring through, performance & appraisal, training & skill administration, etc to exit scheduling.",
  },
  {
    img: "feature-payroll-management.svg",
    title: "Payroll Management",
    text: "Accurately compute staff benefit, timesheets, and overtime and       Manage union dues, cooperative contribution, surcharges.",
  },
  {
    img: "feature-employee-self-service.svg",
    title: "Employee Self Service",
    text: "Employees can access their full personal bio data & transactions history.",
  },
  {
    img: "feature-automated-notification.svg",
    title: "Automated Notifications",
    text: "Automatically sends notification of pending transactions. Sends payslips to each staff at the end of every payroll run.",
  },
  {
    img: "feature-payroll-reporting.svg",
    title: "Exceptional Payroll Reporting",
    text: "Real time access to both summary and detailed transactions and audit.",
  },
  {
    img: "feature-available-online.svg",
    title: "Available Online 24/7",
    text: "Offered on a Software as a Service (SaaS) hosted platform.Requires no investment in infrastructure, server, databases.",
  },
];

const HR_MODULES = [
  ["human-employee-biodata.svg", "Employee Bio Data"],
  ["human-hiring.svg", "Hiring or Recruitment Management"],
  ["human-entitlement-administration.svg", "Entitlement Administration"],
  ["human-employement-history.svg", "Employment History"],
  ["human-education.svg", "Education"],
  ["human-property-management.svg", "Property Management"],
  ["human-job-position-skills.svg", "Job /Position/ Skills Administration"],
  ["human-dependants.svg", "Dependants"],
  ["human-disciplinary.svg", "Disciplinary/ Grievance"],
  ["human-performance.svg", "Performance & Appraisal Management"],
  ["human-training-management.svg", "Training Management"],
  ["human-document-management.svg", "Document Management"],
];

const PAYROLL_MODULES = [
  ["module-payroll-dashboard.svg", "Payroll Dashboard"],
  ["module-payroll-allowance.svg", "Formula based Allowances & Deductions"],
  ["module-loan-mamangement.svg", "Loans Management"],
  ["module-attandace-management.svg", "Attendance Management"],
  ["module-overtime.svg", "Overtimes/Work Scheduling"],
  ["module-single-group-payroll-processing.svg", "Single/Group Payroll Processing"],
  ["module-emailing-payslip.svg", "Emailing Payslips"],
  ["module-standard-reports.svg", "Standard/Custom Reports"],
  ["module-gl-interface.svg", "GL Interface/Project Management"],
  ["module-security-management.svg", "Security management & Audit trail"],
  ["module-self-employee.svg", "Employee Self-Service"],
  ["module-workflow.svg", "Workflow"],
];

export default function PayrollPage({
  onRequestDemo,
}: {
  onRequestDemo: () => void;
}) {
  const [activeTab, setActiveTab] = useState("home");

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

      <section className="payroll-banner topBannerSection">
        <div className="container">
          <div className="row align-items-center height100">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="factura-intro">
                <img src="/assets/img/payroll.svg" className="mobile-img" alt="" />
                <h1 className="mb-3">
                  Efficient, Flexible &amp; Complete HRMS Solution
                </h1>
                <p className="paragraph2 mb-4">
                  Factura HRMS is an innovative system for easy management of
                  Payroll and HR for small to medium and large organization.
                </p>
                <a
                  href="#"
                  className="request-btn big payroll"
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
                  <source src="/assets/vid/payroll.mp4" type="video/mp4" />
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
              <h2 className="text-center">Why Factura HRMS?</h2>
              <p style={{ textAlign: "justify" }}>
                Seize the opportunity to take your organization a step closer
                to success by optimizing cost, and making strategic
                people-oriented business decisions with Factura's HR and
                Payroll Software; an efficient, flexible and innovative system
                for small, medium and large organizations. Factura's HR and
                Payroll Software is easy to install, integrates seamlessly with
                third-party systems, takes minimal training time and reduces
                workload significantly. Manage recruitment, integration,
                transaction, and history with this pan-geographic,
                multi-lingual solution and keep all data stored efficiently in
                one place. Get timely notifications, enjoy features like
                assessment and appraisal, create memos, payslips and enable
                employees to participate in HR processes transparently with
                Factura's highly user-friendly softwares.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="payroll-features-points sectionPadding" id="features">
        <div className="container">
          <h2 className="text-center">
            Factura HRMS Offers Your Organization a host of Benefits
          </h2>
          <div className="row mt5">
            {BENEFITS.map((b) => (
              <div className="col-md-4" key={b.title}>
                <img
                  src={`/assets/img/page-payroll/${b.img}`}
                  alt={b.title}
                  className="mb-3"
                />
                <h3 className="mainHeading3 colorBlack">{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="payroll-module sectionPadding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="module-tabs">
                <ul
                  className="nav nav-tabs nav-justified"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link${activeTab === "home" ? " active show" : ""}`}
                      id="home-tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected={activeTab === "home"}
                      href="#home"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("home");
                      }}
                    >
                      Human Resource
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link${activeTab === "profile" ? " active show" : ""}`}
                      id="profile-tab"
                      role="tab"
                      aria-controls="profile"
                      aria-selected={activeTab === "profile"}
                      href="#profile"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("profile");
                      }}
                    >
                      Payroll
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className={`tab-pane fade${activeTab === "home" ? " active show" : ""}`}
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <ul className="module-list row">
                      {HR_MODULES.map(([img, label]) => (
                        <li className="col-md-3" key={label}>
                          <div className="media">
                            <div className="media-img">
                              <img
                                src={`/assets/img/page-payroll/${img}`}
                                alt={label}
                                className="mr-4"
                              />
                            </div>
                            <div className="media-body">
                              <p>{label}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`tab-pane fade${activeTab === "profile" ? " active show" : ""}`}
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <ul className="module-list row">
                      {PAYROLL_MODULES.map(([img, label]) => (
                        <li className="col-md-3" key={label}>
                          <div className="media">
                            <div className="media-img">
                              <img
                                src={`/assets/img/page-payroll/${img}`}
                                alt={label}
                                className="mr-4"
                              />
                            </div>
                            <div className="media-body">
                              <p>{label}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
              <ClientsSlider logos={PAYROLL_CLIENTS} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

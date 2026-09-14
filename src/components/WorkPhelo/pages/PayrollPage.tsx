"use client";

import React, { useState } from "react";
import ParticleField from "./../ParticleField";
import { ClientsSlider } from "./../TestimonialSliders";
import { PAYROLL_CLIENTS } from "./../data";

const BENEFITS = [
  {
    img: "feature-human-resource-management.svg",
    title: "Human Resource Management",
    text: "A capable HR system that follows each employee from hiring through performance and appraisal, training and skills administration, right up to exit scheduling.",
  },
  {
    img: "feature-payroll-management.svg",
    title: "Payroll Management",
    text: "Compute staff benefits, timesheets and overtime accurately while handling union dues, cooperative contributions and surcharges.",
  },
  {
    img: "feature-employee-self-service.svg",
    title: "Employee Self Service",
    text: "Employees can view their complete personal bio data and transaction history whenever they need.",
  },
  {
    img: "feature-automated-notification.svg",
    title: "Automated Notifications",
    text: "Pending-transaction alerts go out automatically, and every staff member receives their payslip at the close of each payroll run.",
  },
  {
    img: "feature-payroll-reporting.svg",
    title: "Exceptional Payroll Reporting",
    text: "Live access to summary and detailed transactions alike, plus full audit trails.",
  },
  {
    img: "feature-available-online.svg",
    title: "Available Online 24/7",
    text: "Delivered on a Software as a Service (SaaS) hosted platform — no spend required on infrastructure, servers or databases.",
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
            <a href="#features" onClick={scrollTo("#features")}>Features</a>
          </li>
        </ul>
      </div>

      <section className="payroll-banner topBannerSection vibe-hero vibe-hero--navy">
        <ParticleField interactive />
        <div className="container vibe-hero-inner">
          <div className="WorkPhelo-intro">
            <span className="vibe-kicker">Datrix Tech Solutions</span>
            <h1>
              An HRMS That’s Efficient, Flexible &amp; Complete
            </h1>
            <span className="vibe-divider" aria-hidden="true" />
<p className="paragraph2">
              HRPhelo takes the hassle out of Payroll and HR management
              for organizations of every size.
            </p>
            <a
              href="#"
              className="request-btn ghost big"
              onClick={(e) => {
                e.preventDefault();
                onRequestDemo();
              }}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      <section className="overview sectionPadding bgGray">
        <div className="container">
          <div className="row mb-5">
            <div className="col-sm-12 col-md-12">
              <h2 className="text-center">Why HRPhelo?</h2>
              <p style={{ textAlign: "justify" }}>
                Give your organization a fresh step toward success — trim
                costs and make strategic, people-centred decisions with
                HRPhelo, an efficient, flexible and innovative system built
                for small, medium and large organizations alike. Installation
                is simple, third-party integration is seamless, training
                takes hardly any time and workloads shrink noticeably.
                Recruitment, onboarding, transactions and history all live
                efficiently in one place within this pan-geographic,
                multi-lingual solution. Timely notifications, assessment and
                appraisal features, memos and payslips are all at hand — and
                employees join HR processes transparently through HRPhelo’s
                highly approachable software.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="payroll-features-points sectionPadding" id="features">
        <div className="container">
          <h2 className="text-center">
            A Whole Host of Benefits for Your Organization
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

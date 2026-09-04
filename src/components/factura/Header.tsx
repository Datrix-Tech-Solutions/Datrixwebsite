"use client";

import React, { useState } from "react";
import { PRODUCTS } from "./data";

export type RouteKey =
  | "home"
  | "financial"
  | "payroll"
  | "contract"
  | "crm"
  | "contact-us"
  | "privacy"
  | "terms";

const BRAND_TITLE: Record<string, string> = {
  home: "",
  financial: "AccountingPhelo",
  payroll: "HRPhelo",
  contract: "Customized Software",
  crm: "MarketingPhelo",
  "contact-us": "",
  privacy: "",
  terms: "",
};

const FEATURES_MENU: Partial<
  Record<RouteKey, { label: string; slug: string }[]>
> = {
  financial: [
    { label: "Accounting", slug: "/financial#features" },
    { label: "Inventory", slug: "/financial#features" },
    { label: "Sales & Purchase", slug: "/financial#features" },
    { label: "Order & POS", slug: "/financial#features" },
    { label: "Business Intelligence", slug: "/financial#features" },
  ],
  payroll: [
    { label: "Dashboards", slug: "/payroll#features" },
    { label: "Employee Self Service", slug: "/payroll#features" },
    { label: "Workflow", slug: "/payroll#features" },
    { label: "Automated Notifications", slug: "/payroll#features" },
    { label: "Custom Reports", slug: "/payroll#features" },
    { label: "Available Online 24/7", slug: "/payroll#features" },
    { label: "All Features", slug: "/payroll#features" },
  ],
  contract: [
    { label: "Tailored Workflows", slug: "/contract#features" },
    { label: "Seamless Integrations", slug: "/contract#features" },
    { label: "Scalable Architecture", slug: "/contract#features" },
    { label: "Enterprise Security", slug: "/contract#features" },
    { label: "Web & Mobile Apps", slug: "/contract#features" },
    { label: "Analytics & Reporting", slug: "/contract#features" },
    { label: "Dedicated Support", slug: "/contract#features" },
    { label: "Complete Ownership", slug: "/contract#features" },
    { label: "All Features", slug: "/contract#features" },
  ],
  crm: [
    { label: "Account Management", slug: "/crm#features" },
    { label: "Lead Management", slug: "/crm#features" },
    { label: "Opportunities Management", slug: "/crm#features" },
    { label: "Quotation Management", slug: "/crm#features" },
    { label: "Reports & Analytics", slug: "/crm#features" },
    { label: "Territory Management", slug: "/crm#features" },
    { label: "All Features", slug: "/crm#features" },
  ],
};

const FINANCIAL_FEATURE_COLUMNS: { title: string; items: string[] }[] = [
  {
    title: "Purchases",
    items: [
      "Reorder Levels", "Requisitions", "Purchase Orders", "Invoicing",
      "Receipt Notes", "Additional Cost", "Purchase Returns", "O/S Payables",
      "Aging Analysis", "Budget Control*", "Multilevel Approvals",
    ],
  },
  {
    title: "Sales",
    items: [
      "Quotations/Enquiries", "Sales Orders", "Invoicing",
      "Customisable Templates", "POS", "Delivery Notes/Waybills",
      "Sales Returns", "Sales Commission", "O/S Receivables",
      "Aging Analysis", "Multiple Price Levels", "Cost Centers",
    ],
  },
  {
    title: "Inventory",
    items: [
      "Costing & Valuations", "Simple & Advanced UOM", "Barcode",
      "Stock Categorizations", "Multi Location", "Serial Number Tracking",
      "Batch Tracking", "Stock Substitute", "Movement Analysis",
      "Inventory Budgeting", "Fast/Slow Moving items", "Profit Analysis",
    ],
  },
  {
    title: "Manufacturing",
    items: [
      "Bill of Material (BOM)", "Item Kit", "Stock Journal",
      "Production Planning", "Discrete/Mixed-mode Manufacturing",
      "Work Schedule Mgmt.*", "Quality Control*", "Production Analysis",
      "MPS/MRP*", "Costing",
    ],
  },
  {
    title: "Accounting",
    items: [
      "General Ledger", "Accounts Receivable", "Accounts Payable",
      "Fixed Assets*", "Bank Reconciliation", "Data Import",
      "Cost Centre Allocations", "Multi Currency", "Project Accounting",
      "Memorised Voucher", "Budget / Scenarios", "Document Attachments",
      "Business Intelligence",
    ],
  },
];

const INDUSTRIES = [
  "Construction", "Credit Society", "Educational Institutions", "Manufacturing",
  "NGO", "Oil & Gas", "Retail / Trading", "Transport / Rental",
];

interface HeaderProps {
  route: RouteKey;
  onRequestDemo: () => void;
  navigate: (to: string) => void;
}

export default function Header({ route, onRequestDemo, navigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const product = route in PRODUCTS ? route : null;
  const featuresMenu = FEATURES_MENU[route];
  const btnClass = product ? PRODUCTS[product].className : "";
  const dataTitle = BRAND_TITLE[route] ?? "";

  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (key: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <header className="main-header">
      <style
        dangerouslySetInnerHTML={{
          __html: `.dropdown .dropdown-menu a{margin-left:0;padding:5px 10px;display:block;font-size:13px;}`,
        }}
      />
      <nav className="navbar navbar-expand-lg container">
        <a
          className={`navbar-brand ${dataTitle}`}
          href="#/"
          onClick={go("/")}
          data-title={dataTitle}
        >
          <img src="/assets/img/datrix-logo.png" alt="Datrix Tech Solutions" />
        </a>
        <button
          className={`navbar-toggler${menuOpen ? "" : " collapsed"}`}
          id="nav-icon3"
          type="button"
          aria-controls="navbarsExample05"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`navbar-collapse collapse${menuOpen ? " show" : ""}`}
          id="navbarsExample05"
        >
          <div className="nav-item dropdown mega-menu navbar-nav">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdown03"
              aria-haspopup="true"
              aria-expanded={openDropdown === "products"}
              onClick={toggleDropdown("products")}
            >
              Products
            </a>
            <ul
              className={`productMenu dropdown-menu row${
                openDropdown === "products" ? " show" : ""
              }`}
              aria-labelledby="dropdown03"
            >
              <li>
                <ul className="row">
                  <li className="nav-item financial col-sm-12 col-md-6">
                    <a className="financial" href="#/financial" onClick={go("/financial")}>
                      AccountingPhelo
                    </a>
                    <p className="financial">
                      Financials — AccountingPhelo is online accounting software
                      for your business.
                    </p>
                  </li>
                  <li className="nav-item payroll col-sm-12 col-md-6">
                    <a className="payroll" href="#/payroll" onClick={go("/payroll")}>
                      HRPhelo
                    </a>
                    <p className="payroll">
                      HRMS — HRPhelo is an innovative system for easy management
                      of Payroll and HR for small to medium and large
                      organizations.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="row">
                  <li className="nav-item contract col-sm-12 col-md-6">
                    <a className="contract" href="#/contract" onClick={go("/contract")}>
                      Customized Software
                    </a>
                    <p className="contract">
                      Datrix designs bespoke software around your exact
                      workflows — web, mobile and integrations you fully own.
                    </p>
                  </li>
                  <li className="nav-item crm col-sm-12 col-md-6">
                    <a className="crm" href="#/crm" onClick={go("/crm")}>
                      MarketingPhelo
                    </a>
                    <p className="crm">
                      CRM — MarketingPhelo manages your sales pipeline, stay on
                      top of employee activities, and close more deals.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav ml-auto">
            {product && featuresMenu ? (
              <li
                className={`nav-item dropdown${
                  route === "financial" ? "" : " featuresMenu"
                }`}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdown04"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "features"}
                  onClick={toggleDropdown("features")}
                >
                  Features
                </a>
                {route === "financial" ? (
                  <div
                    className={`dropdown-menu financialMegaMenu${
                      openDropdown === "features" ? " show" : ""
                    }`}
                    aria-labelledby="dropdown04"
                    style={{ width: 1024, fontSize: 13 }}
                  >
                    <ul className="row" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {FINANCIAL_FEATURE_COLUMNS.map((col) => (
                        <li className="col" key={col.title}>
                          <h4>{col.title}</h4>
                          <ul className="" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                            {col.items.map((item, i) => (
                              <li key={`${item}-${i}`}>
                                <a className="" href="#/financial#features" onClick={go("/financial#features")}>
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div
                    className={`dropdown-menu${
                      openDropdown === "features" ? " show" : ""
                    }`}
                    aria-labelledby="dropdown04"
                  >
                    {featuresMenu.map((f) => (
                      <a
                        className="dropdown-item"
                        href={`#${f.slug}`}
                        key={f.label}
                        onClick={go(f.slug)}
                      >
                        {f.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ) : null}

            {route === "financial" ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdown05"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "industries"}
                  onClick={toggleDropdown("industries")}
                >
                  Industries
                </a>
                <div
                  className={`dropdown-menu financialMegaMenu${
                    openDropdown === "industries" ? " show" : ""
                  }`}
                  aria-labelledby="dropdown05"
                >
                  <ul className="row" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    <li className="col">
                      <ul className="" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {INDUSTRIES.slice(0, 4).map((ind) => (
                          <li key={ind}>
                            <a className="" href="#/financial#industries" onClick={go("/financial#industries")}>
                              {ind}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="col">
                      <ul className="" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {INDUSTRIES.slice(4).map((ind) => (
                          <li key={ind}>
                            <a className="" href="#/financial#industries" onClick={go("/financial#industries")}>
                              {ind}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>
            ) : null}

            <li className="nav-item">
              <a className="nav-link" href="#/contact-us" onClick={go("/contact-us")}>
                Contact us
              </a>
            </li>
            {product ? (
              <li>
                <a
                  href="#"
                  className={`request-btn ${btnClass}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onRequestDemo();
                  }}
                >
                  Request A Demo
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </header>
  );
}

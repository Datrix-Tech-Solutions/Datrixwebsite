"use client";

import React, { useCallback, useEffect, useState } from "react";
import Header, { type RouteKey } from "./Header";
import Footer, { OurProducts } from "./Footer";
import DemoModal from "./DemoModal";
import HomePage from "./pages/HomePage";
import FinancialPage from "./pages/FinancialPage";
import PayrollPage from "./pages/PayrollPage";
import ContractPage from "./pages/ContractPage";
import CrmPage from "./pages/CrmPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

const BODY_CLASSES: Record<RouteKey, { cls: string; id: string }> = {
  home: { cls: "body- index", id: "index" },
  financial: { cls: "body-financial ", id: "" },
  payroll: { cls: "body-payroll payroll", id: "" },
  contract: { cls: "body-contract contract", id: "" },
  crm: { cls: "body-crm crm", id: "" },
  "contact-us": { cls: "body- ", id: "" },
  privacy: { cls: "body- ", id: "index" },
  terms: { cls: "body- ", id: "index" },
};

const MODAL_PRODUCT: Partial<Record<RouteKey, { value: string; cls: string }>> = {
  financial: { value: "Financials", cls: "financial" },
  payroll: { value: "HRMS", cls: "payroll" },
  contract: { value: "Customized Software", cls: "contract" },
  crm: { value: "CRM", cls: "crm" },
  "contact-us": { value: "", cls: "" },
  privacy: { value: "", cls: "" },
  terms: { value: "", cls: "" },
};

function parseHash(): { route: RouteKey; anchor: string } {
  if (typeof window === "undefined") return { route: "home", anchor: "" };
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return { route: "home", anchor: "" };
  const [pathPart, anchorPart] = raw.split("#");
  const path = pathPart.replace(/^\//, "");
  const known: RouteKey[] = [
    "home",
    "financial",
    "payroll",
    "contract",
    "crm",
    "contact-us",
    "privacy",
    "terms",
  ];
  const route = (known.includes(path as RouteKey) ? path : "home") as RouteKey;
  return { route, anchor: anchorPart || "" };
}

export default function FacturaApp() {
  const [state, setState] = useState<{ route: RouteKey; anchor: string }>({
    route: "home",
    anchor: "",
  });
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setState(parseHash());
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const { route, anchor } = state;

  // body class / scroll management per route
  useEffect(() => {
    const body = document.body;
    const { cls, id } = BODY_CLASSES[route];
    body.className = cls;
    body.id = id;
    if (anchor) {
      // wait a tick for the page to render, then scroll to the anchor
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        else window.scrollTo({ top: 0 });
      }, 60);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [route, anchor]);

  const navigate = useCallback((to: string) => {
    const target = `#${to}`;
    if (window.location.hash === target) {
      setState(parseHash());
    } else {
      window.location.hash = target;
    }
  }, []);

  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  const modal = MODAL_PRODUCT[route] ?? { value: "", cls: "" };

  const showProducts = ["financial", "payroll", "contract", "crm"].includes(
    route
  );

  let page: React.ReactNode;
  switch (route) {
    case "financial":
      page = <FinancialPage onRequestDemo={openDemo} />;
      break;
    case "payroll":
      page = <PayrollPage onRequestDemo={openDemo} />;
      break;
    case "contract":
      page = <ContractPage onRequestDemo={openDemo} />;
      break;
    case "crm":
      page = <CrmPage onRequestDemo={openDemo} />;
      break;
    case "contact-us":
      page = <ContactPage />;
      break;
    case "privacy":
      page = <PrivacyPage />;
      break;
    case "terms":
      page = <TermsPage />;
      break;
    default:
      page = <HomePage navigate={navigate} />;
  }

  return (
    <>
      <Header route={route} onRequestDemo={openDemo} navigate={navigate} />
      {page}
      <Footer navigate={navigate} />
      {showProducts ? <OurProducts routeKey={route} navigate={navigate} /> : null}
      <DemoModal
        open={demoOpen}
        productValue={modal.value}
        productClass={modal.cls}
        onClose={closeDemo}
      />
    </>
  );
}

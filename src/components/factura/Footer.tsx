"use client";

import React from "react";
import { OTHER_PRODUCTS, type Product } from "./data";

export function OurProducts({ routeKey, navigate }: { routeKey: string; navigate: (to: string) => void }) {
  const products = OTHER_PRODUCTS[routeKey];
  if (!products) return null;
  return (
    <section className="our-products">
      <div className="container pt-5 pb-5">
        <h3 className="mainHeading3 text-center colorWhite mb-5">
          Check out our other products
        </h3>
        <div className="row mt-5">
          {products.map((p: Product) => (
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={p.title}>
              <div className="product row">
                <div className="col p0">
                  <img src={p.packImg} alt={p.title} />
                </div>
                <div className="col productDetails">
                  <div className="position-relative">
                    <h2 className="mainHeading2 colorWhite">{p.title}</h2>
                    <p>{p.desc}</p>
                    <a
                      href={`#${p.slug}`}
                      className={`request-btn ${p.className}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(p.slug);
                      }}
                    >
                      <span className="fa-arrow-right"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Footer({ navigate }: { navigate: (to: string) => void }) {
  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <footer className="home-footer">
      <div className="container footer-bottom">
        <div className="row subfooter">
          <div className="col-md-6">
            <p>&copy; Copyright 2019 - Factura</p>
          </div>
          <div className="col-md-6 text-right">
            <ul className="social-links" style={{ listStyle: "none", margin: 0 }}>
              <li>
                <a href="#/privacy" onClick={go("/privacy")}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#/terms" onClick={go("/terms")}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

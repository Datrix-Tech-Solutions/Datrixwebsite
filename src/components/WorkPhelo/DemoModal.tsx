"use client";

import React, { useEffect, useState } from "react";

interface DemoModalProps {
  open: boolean;
  productValue: string;
  productClass: string;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DemoModal({
  open,
  productValue,
  productClass,
  onClose,
}: DemoModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);

  // glide the dialog out before unmounting so close feels as smooth
  // as open; Escape also dismisses
  const requestClose = React.useCallback(() => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 260);
  }, [closing, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, requestClose]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2 || name.trim().length > 25)
      errs.sub_fn = "Kindly tell us your name";
    if (!company.trim()) errs.sub_company = "Please add your company name";
    if (!email.trim() || !EMAIL_RE.test(email))
      errs.sub_email = "Please supply a valid email address";
    if (!phone.trim() || !/^\d{10}$/.test(phone))
      errs.sub_phone = "Please provide a valid 10-digit mobile number";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setTimeout(() => {
        setSubmitted(false);
        requestClose();
      }, 2200);
    }
  };

  return (
    <>
      <div
        className={`modal fade${open ? " show" : ""}${
          closing ? " is-closing" : ""
        }`}
        id="request-demo-form"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="request-demo"
        aria-hidden={!open}
        style={{ display: open ? "block" : "none" }}
      >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title color" id="exampleModalLabel">
              Book Your Demo
            </h5>
            <button
              type="button"
              className="close color"
              aria-label="Close"
              onClick={requestClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form method="post" id="requestForm" name="requestForm" onSubmit={submit} noValidate>
              <input type="hidden" name="type" value="request" />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-default"
                  id="sub_fn"
                  name="sub_fn"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.sub_fn ? (
                  <label className="error" htmlFor="sub_fn">{errors.sub_fn}</label>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-default"
                  id="sub_company"
                  name="sub_company"
                  placeholder="Company / Organization"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                {errors.sub_company ? (
                  <label className="error" htmlFor="sub_company">{errors.sub_company}</label>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-default"
                  id="sub_email"
                  name="sub_email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.sub_email ? (
                  <label className="error" htmlFor="sub_email">{errors.sub_email}</label>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-default"
                  id="sub_phone"
                  name="sub_phone"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.sub_phone ? (
                  <label className="error" htmlFor="sub_phone">{errors.sub_phone}</label>
                ) : null}
              </div>

              <input
                type="hidden"
                className="form-control"
                id="sub_product"
                name="sub_product"
                value={productValue}
              />

              <div className="form-group">
                <input
                  type="submit"
                  name="req-demo"
                  id="req-demo"
                  value="Send Request"
                  className={`request-btn big ${productClass}`}
                />
              </div>
            </form>
            <div
              className="sub_response"
              style={{ display: submitted ? "block" : "none" }}
            >
              <p style={{ margin: 0, fontWeight: 500 }}>
                Thank you! Your request is on its way — we’ll be in touch
                shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      {(open || closing) ? (
        <div
          className={`modal-backdrop fade show${closing ? " is-closing" : ""}`}
          onClick={requestClose}
        />
      ) : null}
    </>
  );
}

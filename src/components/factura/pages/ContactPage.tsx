"use client";

import React, { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "dps@datrixtechsolutions.com";

type SendStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SendStatus>("idle");
  const [successMsg, setSuccessMsg] = useState("");

  const buildMailto = () => {
    const payload = {
      name: name.trim() || "Website visitor",
      email: email.trim(),
      mobile: mobile.trim(),
      notes: notes.trim(),
    };
    const subject = encodeURIComponent(`Website Enquiry — ${payload.name}`);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\nMobile: ${payload.mobile}\n\n${payload.notes}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2 || name.trim().length > 25)
      errs.first_name = "Kindly tell us your name";
    if (!(mobile.trim() && /^\d{10}$/.test(mobile)))
      errs.mobile = "Please provide a valid 10-digit mobile number";
    if (!(email.trim() && EMAIL_RE.test(email)))
      errs.email = "Please supply a valid email address";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      notes: notes.trim(),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Unable to send");
      setSuccessMsg(
        "Thanks for getting in touch — your message has been sent to our inbox and we’ll come back to you in a flash."
      );
      setStatus("success");
      setName("");
      setEmail("");
      setMobile("");
      setNotes("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="wrapper">
      <style
        dangerouslySetInnerHTML={{
          __html: `.our-products,.home-footer{display: none;}`,
        }}
      />
      <section className="contactSection sectionPadding contactApple">
        <div className="container">
          <div className="ca-head">
            <span className="ca-kicker">Contact Us</span>
            <h1>Get in Touch</h1>
            <p className="ca-sub">
              Tell us a little about your business — we’ll come back to you
              within one business day.
            </p>
          </div>

          <div className="ca-form">
            <div className="contact-form-container">
              <form
                id="contactForm"
                name="contactForm"
                role="form"
                onSubmit={submit}
                noValidate
              >
                <input type="hidden" name="type" value="contact" />
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="form-control form-default"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.first_name ? (
                        <label className="error" htmlFor="first_name">
                          {errors.first_name}
                        </label>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control form-default"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email ? (
                        <label className="error" htmlFor="email">
                          {errors.email}
                        </label>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        name="mobile"
                        id="contact"
                        className="form-control form-default"
                        placeholder="Your contact number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                      {errors.mobile ? (
                        <label className="error" htmlFor="contact">
                          {errors.mobile}
                        </label>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control form-default"
                        placeholder="Message"
                        name="notes"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value={status === "sending" ? "Sending…" : "Submit"}
                  name="submit"
                  className="request-btn big"
                  disabled={status === "sending"}
                />
              </form>

              <div
                id="contactSuccess"
                className="contact-submit"
                style={{ display: status === "success" ? "block" : "none" }}
              >
                {successMsg}
              </div>

              <div
                id="contactFailure"
                className="contact-submit contact-failure"
                style={{ display: status === "error" ? "block" : "none" }}
              >
                We couldn’t reach the mail service just now — send it straight
                from your mail app instead:{" "}
                <a href={buildMailto()}>email {CONTACT_EMAIL}</a>
              </div>
            </div>
          </div>

          <p className="ca-mail">
            Prefer email? Write to us directly at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </section>
    </div>
  );
}

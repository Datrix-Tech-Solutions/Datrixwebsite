"use client";

import React, { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2 || name.trim().length > 25)
      errs.first_name = "Please enter your name";
    if (!mobile.trim() || !/^\d{10}$/.test(mobile))
      errs.mobile = "Please enter valid mobile no.";
    if (!email.trim() || !EMAIL_RE.test(email))
      errs.email = "Please enter your valid email address";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSuccess(
        "Thank you for reaching out to us. We will get back to you with lightening speed."
      );
      setName("");
      setEmail("");
      setMobile("");
      setNotes("");
    }
  };

  return (
    <div className="wrapper">
      <style
        dangerouslySetInnerHTML={{
          __html: `.our-products,.home-footer{display: none;}`,
        }}
      />
      <section className="contactSection sectionPadding">
        <div className="container">
          <div className="row align-items-center height100">
            <div className="col-md-6 col-sm-12">
              <div className="contactIllustrator">
                <img src="/assets/img/contact.svg" alt="Contact Datrix Tech Solutions" />
              </div>
              <div className="contanctInfo">
                <h3>Contact Us</h3>
                <p>
                  Please fill out the quick form and we will be in touch with
                  lightening speed.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
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
                    <div className="col-sm-12 col-md-12">
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
                          <label className="error" htmlFor="mobile">
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
                    value="Submit"
                    name="submit"
                    className="request-btn big financial"
                  />
                </form>
                <div
                  id="contactSuccess"
                  className="contact-submit"
                  style={{ display: success ? "block" : "none" }}
                >
                  {success}
                </div>
                <div id="contactFailure" className="contact-submit"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

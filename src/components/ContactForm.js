"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    // Add your Web3Forms access key
    data.append("access_key", "f30b5682-5e4c-4641-8274-cbaf6fb07afc");

    // Website and email subject
    data.append("from_name", "Maaxcy Wax Website");

    const subject = data.get("subject");
    data.set(
      "subject",
      `New Enquiry - Maaxcy Wax | ${subject}`
    );

    setStatus("sending");

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        Thank you for your message. We will get in touch with you shortly.
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cf-first-name" className="sr-only">
            First Name
          </label>
          <input
            type="text"
            id="cf-first-name"
            name="first_name"
            className="form-control"
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cf-last-name" className="sr-only">
            Last Name
          </label>
          <input
            type="text"
            id="cf-last-name"
            name="last_name"
            className="form-control"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="cf-email"
          name="email"
          className="form-control"
          placeholder="Email Address"
          autoComplete="email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-subject" className="sr-only">
          Subject
        </label>
        <input
          type="text"
          id="cf-subject"
          name="subject"
          className="form-control"
          placeholder="Subject"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-message" className="sr-only">
          Your Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          className="form-control"
          placeholder="Your Message"
          rows={4}
          required
        />
      </div>

      <div className="form-group form-submit">
        <button
          type="submit"
          className="submit-btn"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Submit Form"}
        </button>
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">
          Unable to send your message. Please try again.
        </p>
      )}
    </form>
  );
}
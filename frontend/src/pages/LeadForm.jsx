import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber, getCountryCallingCode } from "react-phone-number-input";
import { submitLead } from "../api.js";
import en from "react-phone-number-input/locale/en.json";
import "react-phone-number-input/style.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z\s'\-]+$/;


const customLabels = {};
Object.keys(en).forEach((country) => {
  try {
    const code = getCountryCallingCode(country);
    customLabels[country] = `${en[country]} (+${code})`;
  } catch {
    customLabels[country] = en[country];
  }
});

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  clubName: "",
  message: "",
};

export default function LeadForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  
  function validateField(name, value) {
    const val = (value || "").trim();

    switch (name) {
      case "firstName":
        if (!val) return "First name is required.";
        if (val.length > 100) return "First name must be under 100 characters.";
        if (!NAME_REGEX.test(val)) {
          return "First name should only contain letters, spaces, hyphens, or apostrophes.";
        }
        return "";
      case "lastName":
        if (!val) return "Last name is required.";
        if (val.length > 100) return "Last name must be under 100 characters.";
        if (!NAME_REGEX.test(val)) {
          return "Last name should only contain letters, spaces, hyphens, or apostrophes.";
        }
        return "";
      case "email":
        if (!val) return "Email is required.";
        if (val.length > 100) return "Email must be under 100 characters.";
        if (!EMAIL_REGEX.test(val)) return "Please enter a valid email address.";
        return "";
      case "phone":
        if (!val) return "Phone number is required.";
        if (!isValidPhoneNumber(val)) {
          return "Please enter a valid phone number for the selected country.";
        }
        return "";
      case "clubName":
        if (!val) return "Club / organization name is required.";
        if (val.length > 200) return "Club name must be under 200 characters.";
        return "";
      case "message":
        if (val.length > 2000) return "Message must be under 2000 characters.";
        return "";
      default:
        return "";
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);


    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }

  function validateAll() {
    const nextErrors = {};
    Object.keys(emptyForm).forEach((key) => {
      const errorMsg = validateField(key, form[key]);
      if (errorMsg) {
        nextErrors[key] = errorMsg;
      }
    });
    return nextErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const nextErrors = validateAll();
    
    const allTouched = {};
    Object.keys(emptyForm).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstErrorKey = Object.keys(nextErrors)[0];
      const errorElement = document.getElementById(firstErrorKey);
      if (errorElement) {
        errorElement.focus();
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);
    try {
      await submitLead(form);
      setForm(emptyForm);
      setErrors({});
      setTouched({});
      setSubmitted(true);
    } catch (err) {
      if (err.fields) {
        setErrors(err.fields);
      } else {
        setServerError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page fade-in">
      <div className="card">
        <h1>Junzle <span className="brand-gradient">Lead Magnet</span></h1>
        <p className="subtitle">
          Enter your details below to instantly access your resources.
        </p>

        {submitted && (
          <div className="success" role="status">
            ✨ Thanks — we'll be in touch shortly.
          </div>
        )}

        {!submitted && (
          <form onSubmit={handleSubmit} noValidate>
            {serverError && <div className="error-box">{serverError}</div>}

            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.firstName ? "invalid" : ""}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <div className="error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.firstName}
                </div>
              )}
            </div>

            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.lastName ? "invalid" : ""}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <div className="error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.lastName}
                </div>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? "invalid" : ""}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <div className="error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                id="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={(value) => {
                  setForm((prev) => ({ ...prev, phone: value || "" }));
                  setSubmitted(false);
                  if (touched.phone) {
                    const errorMsg = validateField("phone", value || "");
                    setErrors((prev) => ({ ...prev, phone: errorMsg }));
                  }
                }}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, phone: true }));
                  const errorMsg = validateField("phone", form.phone);
                  setErrors((prev) => ({ ...prev, phone: errorMsg }));
                }}
                className={errors.phone ? "invalid" : ""}
                defaultCountry="IN"
                international
                withCountryCallingCode
                labels={customLabels}
              />
              {errors.phone && (
                <div className="error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.phone}
                </div>
              )}
            </div>

            <div className="field">
              <label htmlFor="clubName">Club / Organization Name</label>
              <input
                id="clubName"
                name="clubName"
                type="text"
                value={form.clubName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.clubName ? "invalid" : ""}
                placeholder="Enter your club or organization name"
              />
              {errors.clubName && (
                <div className="error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.clubName}
                </div>
              )}
            </div>

            <div className="field">
              <label htmlFor="message">
                What do you need help with?
                <span className="optional">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Let us know any details..."
              />
              {errors.message && (
                <div className="error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.message}
                </div>
              )}
            </div>

            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? "Unlocking Access..." : "Get Instant Access"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/**
 * ContactForm — Fused UI (Gemini) + Logic (Claude)
 *
 * Logic (Claude):
 *  - useFormValidation: per-field validation on blur + clear on change
 *  - useEmailJS: sends via EmailJS, status machine (idle/sending/success/error)
 *  - Form resets after successful send; success banner auto-dismisses
 *  - Submit button disabled while sending
 *
 * UI (Gemini):
 *  - Surface card with heading + description
 *  - Dark input fields with mint focus border
 *  - Maroon error border on invalid email
 *  - Mint-bordered submit button with hover fill
 */

import { useRef } from 'react';
import { useEmailJS, useFormValidation, validators } from '../hooks';

const initialValues = { user_name: '', user_email: '', message: '' };

const validationRules = {
  user_name: validators.required('Name'),
  user_email: validators.email(),
  message: validators.compose(
    validators.required('Message'),
    validators.minLength(10, 'Message')
  ),
};

export default function ContactForm() {
  const formRef = useRef(null);
  const { sendEmail, isSending, isSuccess, isError, error: emailError, resetStatus } =
    useEmailJS();
  const { values, errors, touched, handleChange, handleBlur, validate, resetForm } =
    useFormValidation(initialValues, validationRules);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const ok = await sendEmail(formRef);
    if (ok) {
      resetForm();
      setTimeout(resetStatus, 5000);
    }
  };

  // Helper: field border class based on validation state
  const fieldBorder = (name) => {
    if (touched[name] && errors[name]) return 'border-[var(--color-accent-maroon)]';
    return 'border-transparent focus:border-[var(--color-accent-mint)]';
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-[var(--color-bg-surface)] rounded-xl shadow-lg border border-[var(--color-bg-primary)]">


      {/* Status banners */}
      {isSuccess && (
        <div
          id="form-success-banner"
          role="alert"
          className="mb-6 p-4 rounded bg-[var(--color-accent-mint)]/10 border border-[var(--color-accent-mint)] text-[var(--color-accent-mint)] font-mono text-sm text-center"
        >
          Message sent! I'll get back to you soon.
        </div>
      )}
      {isError && (
        <div
          id="form-error-banner"
          role="alert"
          className="mb-6 p-4 rounded bg-[var(--color-accent-maroon)]/10 border border-[var(--color-accent-maroon)] text-[var(--color-accent-maroon)] font-mono text-sm text-center"
        >
          {emailError || 'Something went wrong. Please try again.'}
        </div>
      )}

      <form ref={formRef} id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-mono text-[var(--color-text-primary)] mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="user_name"
            value={values.user_name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={touched.user_name && !!errors.user_name}
            aria-describedby={errors.user_name ? 'name-error' : undefined}
            className={`w-full bg-[var(--color-bg-primary)] border ${fieldBorder('user_name')} text-[var(--color-text-primary)] rounded px-4 py-3 outline-none transition-colors duration-200 font-body`}
          />
          {touched.user_name && errors.user_name && (
            <span id="name-error" role="alert" className="text-[var(--color-accent-maroon)] text-xs font-mono mt-1 block">
              {errors.user_name}
            </span>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-mono text-[var(--color-text-primary)] mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="user_email"
            value={values.user_email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="your.email@example.com"
            autoComplete="email"
            aria-invalid={touched.user_email && !!errors.user_email}
            aria-describedby={errors.user_email ? 'email-error' : undefined}
            className={`w-full bg-[var(--color-bg-primary)] border ${fieldBorder('user_email')} text-[var(--color-text-primary)] rounded px-4 py-3 outline-none transition-colors duration-200 font-body`}
          />
          {touched.user_email && errors.user_email && (
            <span id="email-error" role="alert" className="text-[var(--color-accent-maroon)] text-xs font-mono mt-1 block">
              {errors.user_email}
            </span>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-mono text-[var(--color-text-primary)] mb-2"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Hello Shail, I'd like to discuss..."
            rows={5}
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full bg-[var(--color-bg-primary)] border ${fieldBorder('message')} text-[var(--color-text-primary)] rounded px-4 py-3 outline-none transition-colors duration-200 font-body resize-y`}
          />
          {touched.message && errors.message && (
            <span id="message-error" role="alert" className="text-[var(--color-accent-maroon)] text-xs font-mono mt-1 block">
              {errors.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="contact-submit-btn"
          disabled={isSending}
          className="w-full py-4 bg-transparent border border-[var(--color-accent-mint)] text-[var(--color-accent-mint)] hover:bg-[var(--color-accent-mint)]/10 font-mono text-sm rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

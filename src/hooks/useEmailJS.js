import { useRef, useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';

/**
 * useEmailJS Hook
 * 
 * Encapsulates EmailJS send logic.
 * 
 * Usage:
 *   const { sendEmail, status, error, resetStatus } = useEmailJS();
 *   // Call sendEmail(formRef) on form submit
 * 
 * Config: Set these environment variables in .env:
 *   VITE_EMAILJS_SERVICE_ID
 *   VITE_EMAILJS_TEMPLATE_ID
 *   VITE_EMAILJS_PUBLIC_KEY
 * 
 * Status values: 'idle' | 'sending' | 'success' | 'error'
 */

const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
};

export function useEmailJS() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const sendEmail = useCallback(async (formRef) => {
    if (!formRef?.current) {
      setStatus(STATUS.ERROR);
      setError('Form reference is not available.');
      return false;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus(STATUS.ERROR);
      setError('EmailJS configuration is missing. Check your .env file.');
      console.error('Missing EmailJS env vars:', { serviceId, templateId, publicKey });
      return false;
    }

    setStatus(STATUS.SENDING);
    setError(null);

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus(STATUS.SUCCESS);
      return true;
    } catch (err) {
      setStatus(STATUS.ERROR);
      const message = err?.text || err?.message || 'Failed to send email. Please try again.';
      setError(message);
      console.error('EmailJS error:', err);
      return false;
    }
  }, []);

  const resetStatus = useCallback(() => {
    setStatus(STATUS.IDLE);
    setError(null);
  }, []);

  return {
    sendEmail,
    status,
    error,
    isSending: status === STATUS.SENDING,
    isSuccess: status === STATUS.SUCCESS,
    isError: status === STATUS.ERROR,
    resetStatus,
  };
}

export default useEmailJS;

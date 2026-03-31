import { useState, useCallback, useMemo } from 'react';

/**
 * useFormValidation Hook
 * 
 * Generic form validation with per-field rules.
 * 
 * Usage:
 *   const { values, errors, touched, handleChange, handleBlur, validate, resetForm } =
 *     useFormValidation(initialValues, validationRules);
 * 
 * validationRules is an object: { fieldName: (value) => errorString | null }
 */

/**
 * Built-in validators
 */
export const validators = {
  required: (fieldLabel = 'This field') => (value) =>
    value.trim() ? null : `${fieldLabel} is required.`,

  email: () => (value) => {
    if (!value.trim()) return 'Email is required.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address.';
  },

  minLength: (min, fieldLabel = 'This field') => (value) =>
    value.trim().length >= min ? null : `${fieldLabel} must be at least ${min} characters.`,

  compose: (...fns) => (value) => {
    for (const fn of fns) {
      const error = fn(value);
      if (error) return error;
    }
    return null;
  },
};

export function useFormValidation(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate a single field
  const validateField = useCallback(
    (name, value) => {
      const rule = validationRules[name];
      if (!rule) return null;
      return rule(value);
    },
    [validationRules]
  );

  // Handle input change
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error on change if field was touched
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  // Handle input blur (mark as touched & validate)
  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  // Validate entire form — returns true if valid
  const validate = useCallback(() => {
    const newErrors = {};
    const newTouched = {};
    let isValid = true;

    for (const [name, value] of Object.entries(values)) {
      newTouched[name] = true;
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(newTouched);
    return isValid;
  }, [values, validateField]);

  // Check if form is valid (no errors and all fields touched)
  const isValid = useMemo(() => {
    return Object.values(errors).every((e) => !e) &&
      Object.keys(validationRules).every((key) => touched[key]);
  }, [errors, touched, validationRules]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validate,
    resetForm,
    setValues,
  };
}

export default useFormValidation;

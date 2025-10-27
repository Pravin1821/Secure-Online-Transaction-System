import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const OTPInput = ({ length = 6, onComplete, onChange, value = '', disabled = false }) => {
  const [otp, setOtp] = useState(value);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value !== otp) {
      setOtp(value);
    }
  }, [value]);

  const handleChange = (index, value) => {
    if (disabled) return;

    const newOtp = otp.split('');
    newOtp[index] = value;
    const updatedOtp = newOtp.join('');

    setOtp(updatedOtp);
    onChange?.(updatedOtp);

    if (value && index < length - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    if (updatedOtp.length === length) {
      onComplete?.(updatedOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    setOtp(pastedData);
    onChange?.(pastedData);
    
    if (pastedData.length === length) {
      onComplete?.(pastedData);
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }, (_, index) => (
        <motion.input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="1"
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setActiveIndex(index)}
          disabled={disabled}
          className={`
            w-12 h-12 text-center text-xl font-bold border-2 rounded-lg
            transition-all duration-200 focus:outline-none
            ${activeIndex === index 
              ? 'border-primary-500 ring-2 ring-primary-200' 
              : 'border-base-300'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-400'}
            bg-base-100
          `}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        />
      ))}
    </div>
  );
};

export default OTPInput;




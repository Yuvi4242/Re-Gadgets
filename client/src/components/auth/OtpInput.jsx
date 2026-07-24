import React, { useRef, useState, useEffect } from 'react';

const OtpInput = ({ length = 6, value, onChange, error }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value === "") {
        setOtp(new Array(length).fill(""));
    }
  }, [value, length]);

  const handleChange = (index, e) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newOtp = [...otp];
    // take the last char if user types more than 1
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // concatenate and call onChange
    const combinedOtp = newOtp.join("");
    onChange(combinedOtp);

    // move to next input if current is filled
    if (val && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // move to prev input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pData = e.clipboardData.getData("Text");
    if (isNaN(pData)) return;

    const newOtp = [...otp];
    pData.split("").forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus last input or first empty
    const firstEmpty = newOtp.findIndex(v => !v);
    const lastFocused = firstEmpty === -1 ? length - 1 : firstEmpty;
    inputRefs.current[lastFocused].focus();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2 sm:space-x-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl font-bold rounded-xl border ${error ? 'border-red-500' : 'border-slate-800' } bg-[#020617] text-slate-100 outline-none transition-all duration-300 focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10`}
          />
        ))}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default OtpInput;

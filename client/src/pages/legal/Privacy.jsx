import React from 'react';

const Privacy = () => {
  return (
    <>
      <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-brandPurple/10 border border-brandPurple/20 text-brandPurple font-bold text-xs uppercase tracking-wider mb-6">
        Last Updated: Oct 2026
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
      
      <p>At Re-Gadgets, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile applications.</p>
      
      <h2>1. Information We Collect</h2>
      <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
      <ul>
        <li><strong>Personal Information:</strong> Names, phone numbers, email addresses, mailing addresses, billing addresses, debit/credit card numbers, and passwords.</li>
        <li><strong>Device Data:</strong> We may collect device data such as information about your computer, phone, tablet, or other device you use to access the Services.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>

      <h2>3. Will Your Information Be Shared?</h2>
      <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
      <ul>
        <li><strong>Consent:</strong> We may process your data if you have given us specific consent.</li>
        <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
        <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
      </ul>
      
      <h2>4. Contact Us</h2>
      <p>If you have questions or comments about this notice, you may email us at <a href="mailto:privacy@re-gadgets.com">privacy@re-gadgets.com</a>.</p>
    </>
  );
};

export default Privacy;

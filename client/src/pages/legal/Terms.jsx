import React from 'react';

const Terms = () => {
  return (
    <>
      <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue font-bold text-xs uppercase tracking-wider mb-6">
        Last Updated: Oct 2026
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
      
      <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Re-Gadgets ("Company," “we,” “us,” or “our”), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).</p>
      
      <h2>1. Agreement to Terms</h2>
      <p>By using the Site, you agree to be bound by these Terms of Service and to use the Site in accordance with these Terms of Service, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site.</p>

      <h2>2. User Representations</h2>
      <p>By using the Site, you represent and warrant that:</p>
      <ul>
        <li>All registration information you submit will be true, accurate, current, and complete.</li>
        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
        <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
        <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
      </ul>

      <h2>3. Service and Repair Conditions</h2>
      <p>When booking a repair through Re-Gadgets, you agree to the following:</p>
      <ul>
        <li>You authorize our technicians to perform diagnostics and repairs on your device.</li>
        <li>Re-Gadgets is not responsible for any pre-existing conditions or data loss. We strongly recommend backing up your data before handing over your device.</li>
        <li>Warranty on repairs applies only to the specific parts replaced and labor performed, subject to our 90-day warranty policy.</li>
      </ul>

      <h2>4. Modifications and Interruptions</h2>
      <p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.</p>
    </>
  );
};

export default Terms;

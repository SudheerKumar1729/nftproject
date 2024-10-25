// MoonPayWidget.jsx
import React from 'react';

const MoonPayWidget = ({ walletAddress }) => {
  const moonPayUrl = `https://buy.moonpay.com?apiKey=YOUR_MOONPAY_PUBLIC_KEY&currencyCode=eth&walletAddress=${walletAddress}&enabledPaymentMethods=credit_debit_card`;

  return (
    <div>
      <h2>Buy Ethereum using MoonPay</h2>
      <iframe
        title="MoonPay Widget"
        src={moonPayUrl}
        style={{ width: '100%', height: '700px', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default MoonPayWidget;
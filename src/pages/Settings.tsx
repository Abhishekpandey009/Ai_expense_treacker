import React, { useState } from 'react';
import LanguageCurrencySelector from '../components/settings/LanguageCurrencySelector';

const Settings: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    // ...any other logic
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <LanguageCurrencySelector
        onCurrencyChange={handleCurrencyChange}
        selectedCurrency={selectedCurrency}
      />
    </div>
  );
};

export default Settings;
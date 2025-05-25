import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { currencies } from '../../utils/currencies';

interface LanguageCurrencySelectorProps {
  onCurrencyChange: (currency: string) => void;
  selectedCurrency: string;
}

const LanguageCurrencySelector: React.FC<LanguageCurrencySelectorProps> = ({
  onCurrencyChange,
  selectedCurrency
}) => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' }
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Settings</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('common.language')}
            </label>
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.nativeName} ({language.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('common.currency')}
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default LanguageCurrencySelector;
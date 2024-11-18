
import { useState } from 'react';
import './App.css'
import Navbar from './components/navbar/navbar'
import Home from './pages/Home/Home'
import { useTranslation } from 'react-i18next';
import './utilities/i18n'

const App = () => {
  const languageOptions = [
    {
        value: 'en',
        label: (
            <div className="option">
                <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="English"
                    className="flag-icon"
                />
            </div>
        ),
    },
    {
        value: 'ar',
        label: (
            <div className="option">
                <img
                    src="https://flagcdn.com/w40/eg.png"
                    alt="Arabic"
                    className="flag-icon"
                />
            </div>
    ),
},
];
const { i18n } = useTranslation();

const [dir, setDir] = useState('LTR');

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage?.value);
    setDir(selectedLanguage.value === 'ar' ? 'RTL':'LTR');
};
const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  return (
    <div dir='dir'>
      <Navbar selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} languageOptions={languageOptions} handleLanguageChange={handleLanguageChange} />
      <Home dir={dir} />
  </div>
);
};

export default App

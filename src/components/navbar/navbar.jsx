import { useState } from 'react';
import Select from 'react-select';
import './nav.css';

const languageOptions = [
    {
        value: 'en',
        label: (
            <div className="option">
                <img
                    src="https://flagcdn.com/w40/gb.png" // UK flag
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
                    src="https://flagcdn.com/w40/eg.png" // Egypt flag
                    alt="Arabic"
                    className="flag-icon"
                />
            </div>
        ),
    },
];

const Navbar = ({ selectedLanguage, setSelectedLanguage ,languageOptions,handleLanguageChange}) => {


    return (
        <div className="navbar">
            <p className='advantage'>All Advantage</p>
            <Select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                options={languageOptions}
                isSearchable={false}
                className="language-select"
                styles={{
                    control: (base) => ({
                        ...base,
                        width: "100%",
                        minHeight: 40,
                        border: 'none',
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                    }),
                    dropdownIndicator: () => ({
                        display: 'none', 
                    }),
                    indicatorSeparator: () => ({
                        display: 'none',
                    }),
                    menu: (base) => ({
                        ...base,
                        width: 60,
                    }),
                    option: (base) => ({
                        ...base,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }),
                }}
            />
    
        </div>
    );
};

export default Navbar;

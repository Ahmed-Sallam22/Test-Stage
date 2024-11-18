import { useState } from 'react';
import './Home.css'

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import z from 'zod';
import axios from 'axios';
import { useTranslation } from 'react-i18next';




const formSchema = z.object({
  loginPhone: z.string().min(1, 'Login phone number is required'),
  contactPhone: z.string().min(1, 'Contact phone number is required'),
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Contact name is required'),
  address: z.string().min(1, 'Address is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  sessions: z.string().min(1, 'Monthly sessions are required'),
  cardHolder: z.string().min(1, 'Card holder name is required'),
  cardNumber: z.string().min(1, 'Card number is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  cvc: z.string().min(1, 'CVC is required'),
});



const Home = ({ dir}) => {
  const {t}=useTranslation()


  const countries = [
    { value: "gr", label: t("countries.gr") },
    { value: "us", label: t("countries.us") },
    { value: "eg", label: t("countries.eg") }
  ];

  const sessionOptions = [
    { value: "4", label: t("sessions.4"), price: 100 },
    { value: "8", label: t("sessions.8"), price: 180 },
    { value: "12", label: t("sessions.12"), price: 250 }
  ];

  const periods = [
    { value: "6", label: t("periods.6"), discount: 0.05 },
    { value: "9", label: t("periods.9"), discount: 0.1 },
    { value: "12", label: t("periods.12"), discount: 0.15 },
    { value: "18", label: t("periods.18"), discount: 0.2 },
    { value: "24", label: t("periods.24"), discount: 0.25 },
    { value: "36", label: t("periods.36"), discount: 0.3 }
  ];
  const [selectedPeriod, setSelectedPeriod] = useState('6');
  const [selectedSession, setSelectedSession] = useState(sessionOptions[0]);
  const [payInAdvance, setPayInAdvance] = useState(false);

  const calculateDiscountedPrice = () => {
      const period = periods.find(p => p.value === selectedPeriod);
      const discount = period ? period.discount : 0;
      return selectedSession.price * (1 - discount);
  };

  const [formData, setFormData] = useState({
    loginPhone: '',
    contactPhone: '',
    email: '',
    name: '',
    nr: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    sessions: '',
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const [errors, setErrors] = useState({});

  const validateVisaCard = (cardNumber) => {
    // Visa card numbers start with 4 and are 13 to 19 digits long.
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/;
    return visaRegex.test(cardNumber);
  };
  
  const validateCVC = (cvc) => {
    // CVC must be exactly 3 digits.
    const cvcRegex = /^[0-9]{3}$/;
    return cvcRegex.test(cvc);
  };
  
  const validateExpiryDate = (expiryDate) => {
    // Expiry date in MM/YY format.
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) return false;
  
    // Additional check to ensure the expiry date is not in the past.
    const [month, year] = expiryDate.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = parseInt(currentDate.getFullYear().toString().slice(-2), 10);
    const currentMonth = currentDate.getMonth() + 1;
  
    return year > currentYear || (year === currentYear && month >= currentMonth);
  };
  

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) || '' : value,
    }));
  };

  // Handle PhoneInput changes
  const handlePhoneChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async(e) => {
    e.preventDefault();
const result = formSchema.safeParse(formData);
setErrors({}); // Reset errors
if (!result.success) {
  setErrors(result.error.formErrors.fieldErrors);
  return;
}


    try {
      const response = await axios.post('/wp-json/gostudent/v1/order', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log(response);
  
      setErrors({}); // Clear errors if validation passes
      console.log('Form Submitted Successfully:', response);
      alert('Form submitted successfully!');
    } catch (err) {
      // Extract Zod errors

      setErrors(err);
    }
  };

  
  

    return (
        <div dir={dir} className='Home'>
               <form onSubmit={onSubmit} className="form-content">

            <div className="container">
  <div className="form">
    
    
     <h1 className="heading">{t('title')}</h1>
     <p className="subheading">{t('subtitle')}</p>
     <div  className="phone-input-container">
      <label className="phone-label">
        {t("loginPhoneLabel")} <span>{t("loginPhoneHint")}</span>
      </label>
      <PhoneInput
            country="gr"
            value={formData.loginPhone}
            onChange={(value) => handlePhoneChange('loginPhone', value)}
            inputStyle={{
              backgroundColor: 'rgb(245, 247, 249)',
              border: 'none',
              width: '100%',
              borderRadius: '4px',
              height: '40px',
              paddingLeft: dir === 'RTL' ? '10px' : '50px', // Adjust padding for RTL
              paddingRight: dir === 'RTL' ? '45px' : '10px', // Adjust padding for LTR
              textAlign: dir === 'RTL' ? 'right' : 'left', // Align text for RTL
            }}
            buttonStyle={{
              border: 'none',
              background: 'none',
              padding: 0,
              marginLeft: dir === 'RTL' ? '0' : '10px',
              marginRight: dir === 'RTL' ? '22px' : '0',
           }}
/>
                    {errors.loginPhone && <p className="error-text">{errors.loginPhone}</p>}

    </div>


      <div className="phone-input-container">
      <label className="phone-label">
      {t("contactPhoneLabel")} <span>{t("contactPhoneHint")}</span>
      </label>
      <PhoneInput
        country="gr"
        value={formData.contactPhone}
        onChange={(value) => handlePhoneChange('contactPhone', value)}
           buttonClass="phone-input-button"
           inputStyle={{
            backgroundColor: 'rgb(245, 247, 249)',
            border: 'none',
            width: '100%',
            borderRadius: '4px',
            height: '40px',
            paddingLeft: dir === 'RTL' ? '10px' : '50px', // Adjust padding for RTL
            paddingRight: dir === 'RTL' ? '45px' : '10px', // Adjust padding for LTR
            textAlign: dir === 'RTL' ? 'right' : 'left', // Align text for RTL
          }}
          buttonStyle={{
            border: 'none',
            background: 'none',
            padding: 0,
            marginLeft: dir === 'RTL' ? '0' : '10px',
            marginRight: dir === 'RTL' ? '22px' : '0',
         }}
      />
              {errors.contactPhone && <p className="error-text">{errors.contactPhone}</p>}
              </div>

      <div className="input-container">
  <label className="phone-label">{t("emailLabel")}</label>
  <input
  name='email'
  value={formData.email}
   onChange={handleInputChange}
    className="custom-input"
  />
  {errors.email && <p className="error-message">{errors.email}</p>}
</div>
      <div className="input-container">
  <label className="phone-label">{t("contactNameLabel")}</label>
  <input
    name='name'
    value={formData.name}
     onChange={handleInputChange}
    className="custom-input"
  />
  {errors.name && <p className="error-message">{errors.name}</p>}
</div>

    

<div className="billing-address">
      <label className="phone-label">{t("billingAddressLabel")}</label>
      <div className="input-row">
        <input  
         name='address'
  value={formData.address}
   onChange={handleInputChange}
    type="text" placeholder={t("addressPlaceholder")} className="input input-full" />

        <input    
           name='nr'
  value={formData.nr}
   onChange={handleInputChange} type="text" placeholder={t("nrPlaceholder")} className="input input-small" />
      </div>
                        {errors.address && <p className="error-message">{errors.address}</p>}

      <div className="input-flex">
        <input    name='postalCode'
  value={formData.postalCode}
   onChange={handleInputChange} type="text" placeholder={t("postalCodePlaceholder")}className="input" />
                 {/* {errors.postalCode && <p className="error-message">{errors.postalCode}</p>} */}

        <input    name='city'
  value={formData.city}
   onChange={handleInputChange} type="text" placeholder={t("cityPlaceholder")} className="input" />
                    {/* {errors.city && <p className="error-message">{errors.city}</p>} */}

    <select name='country'
  value={formData.country}
   onChange={handleInputChange} className="input">
      <option value="" disabled selected>
        {t("countryPlaceholder")}
      </option>
      {countries.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
    </select>

    {/* {errors.country && <p className="error-message">{errors.country}</p>} */}


      </div>
    </div>

   

    <div className="mb-4">
                            <label className='phone-label'>{t("monthlySessionsLabel")}</label>
                            <select
                                className="input"
                                name='sessions'
                    value={formData.sessions}
                    onChange={(e) => {
                      const selectedSession = sessionOptions.find((s) => s.value === e.target.value);
                      setSelectedSession(selectedSession); // Update the selected session state
                      handleInputChange(e); // Update the form data state
                    }}
                  >
                
                                <option value="" disabled selected>
                                    {t("monthlySessionsPlaceholder")}
                                </option>
                                {sessionOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors.sessions && <p className="error-message">{errors.sessions}</p>}
                        </div>

      
      
      
      <div className="payment-form">
      <h3 className="payment-title">{t("paymentMethodTitle")}</h3>
      <div className="payment-methods">
        {/* SEPA Option */}
        <div className="SEPA">
        <label className="radio-container">
          <input type="radio" name="payment" />
          <span className="payment-logo">
        
           {t("sepaOption")}
          </span>
        </label>

        </div>


        <div className="SEPA">
        <label className="radio-container">
          <input type="radio" name="payment" />
          <span className="payment-logo-inline">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="payment-image-inline"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard"
              className="payment-image-inline"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="Maestro"
              className="payment-image-inline"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="American Express"
              className="payment-image-inline"
            />
          </span>
        </label>
      <div className="payment-details">
        <div className="input-field">
          <input name='cardHolder'
  value={formData.cardHolder}
   onChange={handleInputChange} type="text"             placeholder={t("cardHolderPlaceholder")}
   />
                    {errors.cardHolder && <p className="error-message">{errors.cardHolder}</p>}

        </div>
        <div className="input-group">
        <input
        name='cardNumber'
        value={formData.cardNumber}
         onChange={handleInputChange}
            type="text"
            placeholder={t("cardNumberPlaceholder")}

            className="card-input card-number card-number-with-icon handel"
          
          />

          <input
          name='expiryDate'
          value={formData.expiryDate}
           onChange={handleInputChange}
            type="text"
            placeholder={t("expiryDatePlaceholder")}
            className="card-input expiry-date"
          />
          <input  name='cvc'
          value={formData.cvc}
           onChange={handleInputChange} type="text"             placeholder={t("cvcPlaceholder")}
           className="card-input cvc" />
        </div>
        {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}

      </div>
          
          
          </div>     
      </div>

      {/* Card Details Form */}

        {/* Card Payment Options */}

      <p className="secure-text">
        {t("secureText")}
      </p>
    </div>
     
    
    
    </div>
  <div className="selection order-container">

      <h2 className="order-title">{t('overview')}</h2>

      {/* Period Selection */}
      <div className="period-grid">
        {periods.map((period) => (
          <button
            key={period.value}
            className={`period-button ${selectedPeriod === period.value ? 'selected' : ''}`}
            onClick={() => setSelectedPeriod(period.value)}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Pay in Advance Toggle */}
      <div className="toggle-container">
        <label className="toggle">
          <input
            type="checkbox"
            checked={payInAdvance}
            onChange={(e) => setPayInAdvance(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
        <span className="toggle-label">
  {t("pay_in_advance")}
        </span>
      </div>

      {/* Pricing Details */}
      <div className="pricing-container">
      <div className="pricing-row">
                            <span>{t('number_of_sessions')}</span>
                            <span className="value">{selectedSession.label}</span>
                        </div>


        <div className="pricing-row">
          <span>{t("regular_price")}</span>
          <div className="price-wrapper">
            <span className="strikethrough">29.60€</span>
            <span className="free-text">{t("free")}</span>
          </div>
        </div>

        <div className="pricing-row">
                            <span>{t("your_price")}</span>
                            <span className="value">{calculateDiscountedPrice()}€</span>
                        </div>


        <div className="pricing-row discount">
          <span>{t("discount")}</span>
          <span>-9.60€</span>
        </div>

        <div className="pricing-row">
          <span>{t("setup_fee")}</span>
          <span className="setup-fee">0.00€</span>
        </div>

        <div className="pricing-row total">
          <span>{t("total_pm")}</span>
          <span className="total-amount">227.20€</span>
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="terms-container">
        <label className="terms-label">
          <input type="checkbox" />
          <span>
         {t("terms")}
          </span>
        </label>
      </div>

      {/* Order Button */}
      <button className="order-button">
       {t("order_now")}
      </button>


  </div>
  </div>
  </form>

            </div>
            
    );
}

export default Home;

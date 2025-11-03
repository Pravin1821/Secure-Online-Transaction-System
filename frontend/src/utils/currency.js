// Currency formatting utilities for Indian Rupee

export const formatIndianCurrency = (amount) => {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  
  // Format with Indian number system (lakhs, crores)
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(amount);
};

export const formatIndianNumber = (number) => {
  if (typeof number !== 'number') {
    number = parseFloat(number) || 0;
  }
  
  return new Intl.NumberFormat('en-IN').format(number);
};

export const getIndianCurrencySymbol = () => '₹';

export const formatAmountWithSymbol = (amount) => {
  return `₹${formatIndianNumber(amount)}`;
};

// Convert to Indian number system (lakhs, crores)
export const formatToIndianSystem = (amount) => {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) { // 1 thousand
    return `₹${(amount / 1000).toFixed(1)}K`;
  } else {
    return `₹${amount}`;
  }
};





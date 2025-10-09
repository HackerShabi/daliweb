// Payment service for handling demo booking payments
// This is a placeholder implementation - replace with real payment gateway later

export interface PaymentData {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  paymentIntentId?: string;
}

export interface CreditCardData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Placeholder payment processing function
export const processPayment = async (
  paymentData: PaymentData,
  cardData: CreditCardData,
  billingAddress: BillingAddress
): Promise<PaymentResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Basic validation
  if (!paymentData.amount || paymentData.amount <= 0) {
    return {
      success: false,
      error: 'Invalid payment amount'
    };
  }

  if (!cardData.cardNumber || cardData.cardNumber.length < 13) {
    return {
      success: false,
      error: 'Invalid card number'
    };
  }

  if (!cardData.cvv || cardData.cvv.length < 3) {
    return {
      success: false,
      error: 'Invalid CVV'
    };
  }

  // Simulate payment processing
  // In a real implementation, this would call Stripe, PayPal, or another payment gateway
  const isSuccessful = Math.random() > 0.1; // 90% success rate for demo

  if (isSuccessful) {
    return {
      success: true,
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      paymentIntentId: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  } else {
    return {
      success: false,
      error: 'Payment declined. Please try a different card.'
    };
  }
};

// Create payment intent (placeholder for Stripe-like flow)
export const createPaymentIntent = async (
  amount: number,
  currency: string = 'usd',
  customerEmail: string
): Promise<{ clientSecret: string; paymentIntentId: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
    paymentIntentId: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
};

// Validate credit card number (accept any 16-digit number)
export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  // Check if it's exactly 16 digits
  if (!/^\d{16}$/.test(cleanNumber)) {
    return false;
  }

  return true;
};

// Get card type from card number
export const getCardType = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(cleanNumber)) {
    return 'Visa';
  } else if (/^5[1-5]/.test(cleanNumber)) {
    return 'Mastercard';
  } else if (/^3[47]/.test(cleanNumber)) {
    return 'American Express';
  } else if (/^6/.test(cleanNumber)) {
    return 'Discover';
  }
  
  return 'Unknown';
};

// Format card number with spaces
export const formatCardNumber = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  const groups = cleanNumber.match(/.{1,4}/g) || [];
  return groups.join(' ').substr(0, 19); // Limit to 16 digits + 3 spaces
};

// Format expiry date
export const formatExpiryDate = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 2) {
    return cleanValue.substr(0, 2) + '/' + cleanValue.substr(2, 2);
  }
  return cleanValue;
};

// Validate expiry date
export const validateExpiryDate = (month: string, year: string): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month);
  const expYear = parseInt(year);

  if (expMonth < 1 || expMonth > 12) {
    return false;
  }

  if (expYear < currentYear) {
    return false;
  }

  if (expYear === currentYear && expMonth < currentMonth) {
    return false;
  }

  return true;
};

// Calculate processing fee (example: 2.9% + $0.30)
export const calculateProcessingFee = (amount: number): number => {
  return Math.round((amount * 0.029 + 0.30) * 100) / 100;
};

// Get total amount including fees
export const getTotalWithFees = (baseAmount: number): { subtotal: number; processingFee: number; total: number } => {
  const processingFee = calculateProcessingFee(baseAmount);
  const total = baseAmount + processingFee;
  
  return {
    subtotal: baseAmount,
    processingFee,
    total
  };
};
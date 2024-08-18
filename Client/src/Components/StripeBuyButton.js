import React, { useEffect } from 'react';


const StripeBuyButton = () => {
  useEffect(() => {
    // Load the Stripe Buy Button script when the component mounts
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <stripe-buy-button 
        buy-button-id="buy_btn_1PopNb2KqNIKpvjTucAvrQN1"  // Replace with your actual Buy Button ID
        publishable-key="pk_test_51PomwV2KqNIKpvjTmfXGqzMBFeOaL5IB6eo2JXrYQyQA6I9SpcBk0BUryvoLItEwLsIqAhJjKN32a3OAsXaDHPFV00nKPNqqnx">
      </stripe-buy-button>
    </div>
  );
};

export default StripeBuyButton;


// Google Ads conversion tracking utilities

/**
 * Checks if Google Ads tag is loaded
 * @returns boolean indicating if gtag is available
 */
export const isGtagLoaded = (): boolean => {
  return typeof window !== 'undefined' && 'gtag' in window;
};

/**
 * Tracks a Google Ads conversion event
 * @param conversionId - The Google Ads conversion ID
 * @param conversionLabel - The specific conversion label for the event
 * @param options - Additional parameters to send with the conversion
 */
export const trackGoogleAdsConversion = (
  conversionId: string,
  conversionLabel: string,
  options: Record<string, any> = {}
) => {
  // Only run if gtag is available
  if (isGtagLoaded()) {
    const gtag = (window as any).gtag;
    
    // Send the conversion to Google Ads
    gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
      value: options.value || 0,
      currency: options.currency || 'USD',
      transaction_id: options.transactionId,
      ...options
    });
    
    console.log(`Google Ads conversion tracked: ${conversionLabel}`);
  } else {
    console.warn('Google Ads tracking unavailable: gtag not found');
    
    // Attempt to load the gtag script if it's missing
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      console.log('Attempting to load Google Ads script dynamically');
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=AW-828832872`;
      document.head.appendChild(script);
      
      // Initialize gtag
      const initScript = document.createElement('script');
      initScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-828832872');
      `;
      document.head.appendChild(initScript);
    }
  }
};

/**
 * Track when a user completes the quiz and registers for results
 * @param email - User's email address
 */
export const trackQuizResultsRegistration = (email: string) => {
  // Your specific Google Ads conversion ID
  const conversionId = 'AW-828832872';
  const conversionLabel = 'QUIZ_RESULTS_LABEL';
  
  trackGoogleAdsConversion(conversionId, conversionLabel, {
    user_data: {
      email_address: email ? email.trim().toLowerCase() : undefined
    }
  });
};

/**
 * Track when a user registers for a free trial
 * @param email - User's email address
 * @param pricingPlan - Selected pricing plan ('monthly' or 'annual')
 */
export const trackTrialRegistration = (email: string, pricingPlan?: 'monthly' | 'annual') => {
  // Your specific Google Ads conversion ID
  const conversionId = 'AW-828832872';
  const conversionLabel = 'TRIAL_SIGNUP_LABEL';
  
  // Different values for different pricing plans
  let value = 0;
  if (pricingPlan === 'monthly') {
    value = 9.99;
  } else if (pricingPlan === 'annual') {
    value = 99;
  }
  
  trackGoogleAdsConversion(conversionId, conversionLabel, {
    value,
    currency: 'USD',
    user_data: {
      email_address: email ? email.trim().toLowerCase() : undefined
    },
    pricingPlan
  });
};

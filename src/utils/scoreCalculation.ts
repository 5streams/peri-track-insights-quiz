
// Mapping of symptoms to hormones
const hormoneSymptomMap: Record<string, Record<string, number>> = {
  menstrualCycle: { estrogen: 0.8, progesterone: 0.7 },
  hotFlashes: { estrogen: 0.9, progesterone: 0.3 },
  sleepQuality: { progesterone: 0.9, estrogen: 0.4 },
  moodChanges: { estrogen: 0.7, progesterone: 0.7, testosterone: 0.5 },
  cognitiveFunction: { estrogen: 0.8, testosterone: 0.4 },
  physicalChanges: { estrogen: 0.6, testosterone: 0.7, progesterone: 0.4 },
  sexualHealth: { testosterone: 0.9, estrogen: 0.7 },
  age: { estrogen: 0.5, progesterone: 0.5, testosterone: 0.5 }
};

// Symptom category mapping for UI display
export const symptomCategories: Record<string, string> = {
  menstrualCycle: "Menstrual Changes",
  hotFlashes: "Hot Flashes & Night Sweats",
  sleepQuality: "Sleep Disruptions",
  moodChanges: "Mood Changes",
  cognitiveFunction: "Brain Fog & Memory",
  physicalChanges: "Physical Changes",
  sexualHealth: "Sexual Health Changes",
};

// Calculate hormone scores based on quiz responses
export const calculateHormoneScores = (results: any) => {
  const { score: overallScore, primarySymptoms } = results;
  let estrogenScore = 0;
  let progesteroneScore = 0;
  let testosteroneScore = 0;
  
  // Use overall score to influence individual hormone scores
  // based on primary symptoms
  primarySymptoms.forEach((symptom: string) => {
    const normalizedSymptom = Object.entries(symptomCategories).find(
      ([_, value]) => value === symptom
    )?.[0];
    
    if (normalizedSymptom && hormoneSymptomMap[normalizedSymptom]) {
      const weights = hormoneSymptomMap[normalizedSymptom];
      if (weights.estrogen) estrogenScore += overallScore * weights.estrogen;
      if (weights.progesterone) progesteroneScore += overallScore * weights.progesterone;
      if (weights.testosterone) testosteroneScore += overallScore * weights.testosterone;
    }
  });
  
  // Normalize scores to 0-100 range
  const maxPossibleScore = overallScore * 3; // worst case if all hormones got full weight
  estrogenScore = Math.min(100, (estrogenScore / maxPossibleScore) * 100);
  progesteroneScore = Math.min(100, (progesteroneScore / maxPossibleScore) * 100);
  testosteroneScore = Math.min(100, (testosteroneScore / maxPossibleScore) * 100);
  
  // Determine primary hormone based on highest score
  const hormoneScores = {
    estrogen: estrogenScore,
    progesterone: progesteroneScore,
    testosterone: testosteroneScore
  };
  
  const primaryHormone = Object.entries(hormoneScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)[0][0];
    
  return {
    overall: Math.round(overallScore),
    estrogen: Math.round(estrogenScore),
    progesterone: Math.round(progesteroneScore),
    testosterone: Math.round(testosteroneScore),
    primaryHormone,
    primarySymptoms
  };
};

// Get dynamic content based on score category
export const getDynamicContent = (scoreCategory: string, firstName: string = "") => {
  // Greetings
  const greetings = {
    mild: `${firstName}, your assessment indicates you're experiencing early signs of perimenopause. You're noticing changes, but they're not severely impacting your daily functioning yet.`,
    moderate: `${firstName}, your assessment suggests you're experiencing moderate perimenopause symptoms. While you're managing, these changes are affecting several areas of your life.`,
    severe: `${firstName}, your assessment reveals you're experiencing significant perimenopause symptoms that deserve immediate attention. Your responses show these changes are having a substantial impact on your daily life.`
  };
  
  // Validation statements
  const validations = {
    mild: "The subtle changes you're noticing are real and worth paying attention to. Many women in early perimenopause dismiss these signs, only to be surprised when they intensify later.",
    moderate: "The challenges you're facing are real and valid. Perimenopause symptoms often come and go unpredictably, making many women question what's happening to their bodies.",
    severe: "Your experience is valid, and the intensity of your symptoms deserves serious attention. Unfortunately, many women's perimenopause symptoms are dismissed as 'just aging' when they actually require proper support."
  };
  
  // CTA content
  const ctaContent = {
    mild: "Start understanding your hormone patterns before symptoms intensify.",
    moderate: "Start tracking your symptoms now to prevent them from worsening.",
    severe: "Take the first step toward relief from your symptoms today."
  };
  
  return {
    greeting: greetings[scoreCategory as keyof typeof greetings] || greetings.moderate,
    validation: validations[scoreCategory as keyof typeof validations] || validations.moderate,
    ctaText: ctaContent[scoreCategory as keyof typeof ctaContent] || ctaContent.moderate
  };
};

// Get hormone explanations based on hormone and score category
export const getHormoneExplanation = (hormone: string, scoreCategory: string) => {
  const explanations = {
    estrogen: {
      mild: "Your responses indicate your estrogen levels may be starting to fluctuate, though not severely yet.",
      moderate: "Your responses suggest moderate estrogen fluctuations, which could explain the variable nature of your symptoms.",
      severe: "Your responses indicate substantial estrogen fluctuations, explaining why your symptoms can be intense and unpredictable."
    },
    progesterone: {
      mild: "Your assessment suggests early changes in progesterone levels that might be contributing to subtle symptoms.",
      moderate: "Your assessment indicates moderate progesterone changes that are likely affecting your sleep quality and mood stability.",
      severe: "Your assessment reveals significant progesterone decline, which strongly correlates with your reported sleep and anxiety symptoms."
    },
    testosterone: {
      mild: "Your responses indicate subtle changes in testosterone levels that might be beginning to affect your energy and vitality.",
      moderate: "Your responses suggest moderate testosterone changes that could explain your energy fluctuations and decreased motivation.",
      severe: "Your responses show significant testosterone changes that are likely contributing to your fatigue, decreased motivation, and changes in body composition."
    }
  };
  
  return explanations[hormone as keyof typeof explanations]?.[scoreCategory as keyof typeof explanations.estrogen] || 
    "Your hormone levels may be fluctuating, which is common during perimenopause.";
};

// Get symptom explanations based on symptom type and hormone
export const getSymptomExplanation = (symptom: string, hormone: string) => {
  const explanations: Record<string, Record<string, string>> = {
    "Menstrual Changes": {
      estrogen: "Your changing menstrual patterns are directly linked to fluctuating estrogen levels affecting your uterine lining.",
      progesterone: "Unpredictable periods can result from changing progesterone levels, which regulate the menstrual cycle.",
      testosterone: "Hormone fluctuations can affect cycle regularity and menstrual symptoms."
    },
    "Hot Flashes & Night Sweats": {
      estrogen: "Hot flashes and night sweats occur when dropping estrogen levels affect your body's temperature regulation center.",
      progesterone: "Progesterone changes can worsen temperature regulation issues, particularly during sleep.",
      testosterone: "Hormone imbalances can contribute to temperature regulation problems."
    },
    "Sleep Disruptions": {
      estrogen: "Estrogen helps produce serotonin, which helps regulate sleep. Fluctuations can disrupt your sleep patterns.",
      progesterone: "Progesterone helps your brain produce GABA—a calming neurotransmitter that promotes deep sleep. Declining levels make it harder to stay asleep.",
      testosterone: "Changing hormone levels can affect sleep quality and maintenance."
    },
    "Mood Changes": {
      estrogen: "Estrogen helps regulate serotonin and dopamine—key neurotransmitters for mood stability. Fluctuations can cause mood swings.",
      progesterone: "Progesterone has a calming effect on the brain. Lower levels can increase anxiety and irritability.",
      testosterone: "Testosterone contributes to motivation and confidence. Changes can affect mood and emotional well-being."
    },
    "Brain Fog & Memory": {
      estrogen: "Estrogen supports cognitive function and memory. Fluctuations can cause concentration issues and forgetfulness.",
      progesterone: "Progesterone affects cognitive function, especially verbal memory and processing speed.",
      testosterone: "Testosterone supports focus and mental clarity. Changes may affect cognitive function."
    },
    "Physical Changes": {
      estrogen: "Estrogen affects fat distribution, skin elasticity, and bone density. Changes can cause weight redistribution and skin changes.",
      progesterone: "Progesterone can affect fluid retention and joint comfort.",
      testosterone: "Testosterone helps maintain muscle mass and energy. Lower levels can affect body composition and vitality."
    },
    "Sexual Health Changes": {
      estrogen: "Estrogen maintains vaginal tissue health and lubrication. Lower levels can cause dryness and discomfort.",
      progesterone: "Progesterone works with other hormones to maintain sexual health and comfort.",
      testosterone: "Testosterone is crucial for libido and sexual response in women. Declining levels directly affect desire and satisfaction."
    }
  };
  
  return explanations[symptom]?.[hormone] || "This symptom may be connected to your changing hormone levels.";
};

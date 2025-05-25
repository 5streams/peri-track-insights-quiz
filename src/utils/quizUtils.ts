
interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

// Scoring map for each question
const scoreMap: Record<string, Record<string, number>> = {
  menstrualCycle: { 
    regular: 0, 
    somewhat_irregular: 10, 
    very_irregular: 20, 
    skipping: 30, 
    several_months: 40, 
    no_periods: 50 
  },
  hotFlashes: { 
    never: 0, 
    rarely: 5, 
    occasionally: 15, 
    frequently: 25, 
    daily: 35, 
    multiple_daily: 45 
  },
  sleepQuality: { 
    excellent: 0, 
    good: 10, 
    fair: 20, 
    poor: 30, 
    very_poor: 40 
  },
  moodChanges: { 
    no_changes: 0, 
    mild: 10, 
    moderate: 20, 
    significant: 30, 
    severe: 40 
  },
  cognitiveFunction: { 
    no_changes: 0, 
    occasional: 10, 
    noticeable: 20, 
    frequent: 30, 
    significant: 40 
  },
  physicalChanges: { 
    weight_gain: 10, 
    skin_changes: 10, 
    joint_pain: 10, 
    heart_palpitations: 10, 
    hair_changes: 10, 
    none: 0 
  },
  sexualHealth: { 
    decreased_libido: 10, 
    vaginal_dryness: 10, 
    pain_intercourse: 10, 
    arousal_changes: 10, 
    none: 0 
  },
  seekingRelief: { 
    actively_looking: 20, 
    just_research: 0, 
    tried_everything: 30 
  }
};

// Symptom category mapping
const symptomCategories: Record<string, string> = {
  menstrualCycle: "Menstrual Changes",
  hotFlashes: "Vasomotor Symptoms",
  sleepQuality: "Sleep Disturbances",
  moodChanges: "Mood Fluctuations",
  cognitiveFunction: "Cognitive Changes",
  physicalChanges: "Physical Changes",
  sexualHealth: "Sexual Health Changes",
  seekingRelief: "Symptom Relief Seeking"
};

// Function to calculate quiz results
export const calculateResults = (answers: Record<string, string | string[]>): QuizResults => {
  console.log("calculateResults: Processing answers:", answers);
  
  let rawScore = 0;
  const symptomScores: Record<string, number> = {};

  // Calculate raw score
  for (const questionId in answers) {
    const answer = answers[questionId];
    
    // Handle multiple selection questions
    if (Array.isArray(answer)) {
      let questionScore = 0;
      answer.forEach(option => {
        questionScore += scoreMap[questionId]?.[option] || 0;
      });
      rawScore += questionScore;
      symptomScores[questionId] = questionScore;
    } 
    // Handle single selection questions
    else {
      const score = scoreMap[questionId]?.[answer] || 0;
      rawScore += score;
      symptomScores[questionId] = score;
    }
  }

  console.log("calculateResults: Raw score:", rawScore, "Symptom scores:", symptomScores);

  // Calculate normalized score (0-100)
  const maxPossibleScore = 325; // Updated to include seekingRelief max score
  const normalizedScore = Math.min(100, Math.round((rawScore / maxPossibleScore) * 100));

  // Determine phase
  let phase = "Early";
  if (normalizedScore >= 70) phase = "Late";
  else if (normalizedScore >= 40) phase = "Mid";

  // Determine primary symptom clusters based on highest scoring areas
  const sortedSymptoms = Object.entries(symptomScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .filter(([questionId]) => questionId !== 'seekingRelief') // Exclude seekingRelief from symptom clusters
    .slice(0, 3)
    .map(([questionId]) => symptomCategories[questionId]);

  // Generate basic recommendations based on phase
  const recommendedActions = [];
  
  if (phase === "Early") {
    recommendedActions.push(
      "Start tracking your cycle and symptoms",
      "Consider hormone testing to establish your baseline"
    );
  } else if (phase === "Mid") {
    recommendedActions.push(
      "Discuss hormone replacement therapy options with your healthcare provider",
      "Implement lifestyle changes to manage symptoms"
    );
  } else {
    recommendedActions.push(
      "Develop a comprehensive management plan with your healthcare provider",
      "Focus on long-term health considerations during this transition"
    );
  }

  const results = {
    score: normalizedScore,
    phase,
    primarySymptoms: sortedSymptoms,
    recommendedActions
  };

  console.log("calculateResults: Final results:", results);
  return results;
};

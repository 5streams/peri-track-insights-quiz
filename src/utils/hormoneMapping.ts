
// Map symptoms to primary hormones
export const mapSymptomsToPrimaryHormone = (symptoms: string[]): string => {
  // Count hormone associations
  let hormoneCount = {
    testosterone: 0,
    progesterone: 0,
    estradiol: 0,
    thyroid: 0
  };
  
  // Map of symptoms to hormones
  const symptomHormoneMap: Record<string, string[]> = {
    "Menstrual Changes": ["estradiol", "progesterone"],
    "Vasomotor Symptoms": ["estradiol"],
    "Sleep Disturbances": ["progesterone"],
    "Mood Fluctuations": ["estradiol", "progesterone"],
    "Cognitive Changes": ["estradiol"],
    "Physical Changes": ["estradiol", "testosterone", "thyroid"],
    "Sexual Health Changes": ["testosterone", "estradiol"]
  };
  
  // Count hormone associations for each symptom
  symptoms.forEach(symptom => {
    const associatedHormones = symptomHormoneMap[symptom] || [];
    associatedHormones.forEach(hormone => {
      if (hormoneCount.hasOwnProperty(hormone)) {
        hormoneCount[hormone as keyof typeof hormoneCount]++;
      }
    });
  });
  
  // Find hormone with highest count
  let primaryHormone = "estradiol"; // Default
  let maxCount = 0;
  
  Object.entries(hormoneCount).forEach(([hormone, count]) => {
    if (count > maxCount) {
      maxCount = count;
      primaryHormone = hormone;
    }
  });
  
  return primaryHormone;
};

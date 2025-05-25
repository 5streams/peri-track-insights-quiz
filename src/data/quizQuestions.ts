
export interface QuizQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: {
    id: string;
    text: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "menstrualCycle",
    text: "How would you describe your menstrual cycles over the past 6-12 months?",
    type: "single",
    options: [
      { id: "regular", text: "Regular and predictable (about the same length each month)" },
      { id: "somewhat_irregular", text: "Somewhat irregular (varying by a few days to a week)" },
      { id: "very_irregular", text: "Very irregular (unpredictable, with some cycles much longer or shorter)" },
      { id: "skipping", text: "Skipping periods occasionally (missing 1-3 periods in the past year)" },
      { id: "several_months", text: "I haven't had a period in several months but less than a year" },
      { id: "no_periods", text: "I no longer have periods (no period for 12+ months)" }
    ]
  },
  {
    id: "hotFlashes",
    text: "Have you experienced hot flashes or night sweats?",
    type: "single",
    options: [
      { id: "never", text: "Never" },
      { id: "rarely", text: "Rarely (once a month or less)" },
      { id: "occasionally", text: "Occasionally (a few times a month)" },
      { id: "frequently", text: "Frequently (several times a week)" },
      { id: "daily", text: "Daily (at least once most days)" },
      { id: "multiple_daily", text: "Multiple times daily (significantly affecting my quality of life)" }
    ]
  },
  {
    id: "sleepQuality",
    text: "How would you rate your sleep quality recently?",
    type: "single",
    options: [
      { id: "excellent", text: "Excellent (fall asleep easily and sleep through the night)" },
      { id: "good", text: "Good (occasional difficulty but generally sleep well)" },
      { id: "fair", text: "Fair (regular difficulty falling or staying asleep)" },
      { id: "poor", text: "Poor (frequently wake up during the night)" },
      { id: "very_poor", text: "Very poor (severe insomnia or sleep disturbances most nights)" }
    ]
  },
  {
    id: "moodChanges",
    text: "Have you noticed changes in your mood that feel different from your typical patterns?",
    type: "single",
    options: [
      { id: "no_changes", text: "No changes" },
      { id: "mild", text: "Mild mood fluctuations" },
      { id: "moderate", text: "Moderate mood swings that are noticeable but manageable" },
      { id: "significant", text: "Significant mood changes that affect my daily life" },
      { id: "severe", text: "Severe mood disruptions including anxiety or depression symptoms" }
    ]
  },
  {
    id: "cognitiveFunction",
    text: "Have you experienced changes in memory, focus, or mental clarity?",
    type: "single",
    options: [
      { id: "no_changes", text: "No changes noticed" },
      { id: "occasional", text: "Occasional minor forgetfulness" },
      { id: "noticeable", text: "Noticeable \"brain fog\" or difficulty concentrating" },
      { id: "frequent", text: "Frequent memory lapses or difficulty finding words" },
      { id: "significant", text: "Significant cognitive changes that interfere with work or daily tasks" }
    ]
  },
  {
    id: "physicalChanges",
    text: "Have you noticed any of these physical changes? (Select all that apply)",
    type: "multiple",
    options: [
      { id: "weight_gain", text: "Weight gain, especially around the midsection" },
      { id: "skin_changes", text: "Changes in skin texture or dryness" },
      { id: "joint_pain", text: "Increased joint or muscle pain" },
      { id: "heart_palpitations", text: "Heart palpitations or racing heart" },
      { id: "hair_changes", text: "Changes in hair texture or hair loss" },
      { id: "none", text: "None of these changes" }
    ]
  },
  {
    id: "sexualHealth",
    text: "Have you experienced changes in your sexual health? (Select all that apply)",
    type: "multiple",
    options: [
      { id: "decreased_libido", text: "Decreased libido or interest in sex" },
      { id: "vaginal_dryness", text: "Vaginal dryness or discomfort" },
      { id: "pain_intercourse", text: "Pain during intercourse" },
      { id: "arousal_changes", text: "Changes in arousal or ability to reach orgasm" },
      { id: "none", text: "None of these changes" }
    ]
  },
  {
    id: "age",
    text: "What is your current age?",
    type: "single",
    options: [
      { id: "under_35", text: "Under 35" },
      { id: "35_39", text: "35-39" },
      { id: "40_44", text: "40-44" },
      { id: "45_49", text: "45-49" },
      { id: "50_54", text: "50-54" },
      { id: "55_plus", text: "55 or older" }
    ]
  },
  {
    id: "bloodworkInterest",
    text: "Have you ever wanted to get the proper bloodwork done in order to see exactly what might be going on with your body?",
    type: "single",
    options: [
      { id: "thinking_about_it", text: "Yes I am thinking about it" },
      { id: "not_at_this_time", text: "No not at this time" },
      { id: "done_no_results", text: "I've had bloodwork done and nothing came from it" }
    ]
  }
];

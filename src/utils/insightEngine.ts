type WellnessLog = {
  mood: string;
  sleepHours: number;
  stressLevel: number;
  painLevel: number;
  symptoms: string[];
  cyclePhase?: string;
};

export function generateInsights(
  logs: WellnessLog[]
): string[] {
  const insights: string[] = [];

  if (logs.length === 0) {
    return [
      "Start tracking your wellness journey to unlock personalized insights ✨",
    ];
  }

  const averageSleep =
    logs.reduce(
      (sum, log) =>
        sum + log.sleepHours,
      0
    ) / logs.length;

  const averageStress =
    logs.reduce(
      (sum, log) =>
        sum + log.stressLevel,
      0
    ) / logs.length;

  const averagePain =
    logs.reduce(
      (sum, log) =>
        sum + log.painLevel,
      0
    ) / logs.length;

  const anxiousCount =
    logs.filter(
      (log) =>
        log.mood === "Anxious"
    ).length;

  const symptomFrequency =
    logs.flatMap(
      (log) => log.symptoms
    );

// BEFORE PERIOD ANALYSIS
const beforePeriodLogs =
  logs.filter(
    (log) =>
      log.cyclePhase ===
      "Before Period"
  );

const highPainBeforePeriod =
  beforePeriodLogs.filter(
    (log) =>
      log.painLevel > 5
  );
  const highStressLogs =
  logs.filter(
    (log) =>
      log.stressLevel >= 7
  );

const highStressHighPain =
  highStressLogs.filter(
    (log) =>
      log.painLevel >= 6
  );
const poorSleepLogs =
  logs.filter(
    (log) =>
      log.sleepHours < 6
  );

const poorSleepMoodLogs =
  poorSleepLogs.filter(
    (log) =>
      log.mood === "Sad" ||
      log.mood === "Anxious"
  );
  const happyCount =
  logs.filter(
    (log) =>
      log.mood === "Happy"
  ).length;
  // Low sleep + stress
  if (
    averageSleep < 6 &&
    averageStress > 6
  ) {
    insights.push(
      "You tend to experience higher stress during low-sleep periods. Improving sleep consistency may help support emotional balance."
    );
  }
  if (
  poorSleepLogs.length >= 2 &&
  poorSleepMoodLogs.length /
    poorSleepLogs.length >
    0.5
) {
  insights.push(
    "Lower sleep duration appears alongside more challenging moods. Prioritizing rest may support emotional wellbeing."
  );
}
if (
  happyCount >=
  logs.length * 0.6
) {
  insights.push(
    "Positive moods appear consistently in your recent logs. Maintaining your current wellness habits may be supporting this trend."
  );
}
  // Pain trend
  if (averagePain > 6) {
    insights.push(
      "You’ve reported stronger discomfort recently. Staying hydrated, stretching gently, and prioritizing rest may help ease symptoms."
    );
  }
  if (
  highPainBeforePeriod.length >=
  2
) {
  insights.push(
    "You often report stronger discomfort before your cycle begins. Light movement, hydration, and consistent sleep may help support comfort."
  );
}
if (
  highStressLogs.length >= 2 &&
  highStressHighPain.length /
    highStressLogs.length >
    0.5
) {
  insights.push(
    "Higher stress days often coincide with stronger discomfort. Stress management may positively influence how you feel physically."
  );
}
  // Anxiety trend
  if (anxiousCount >= 2) {
    insights.push(
      "You’ve reported anxious moods frequently. Tracking lifestyle habits like sleep and stress may help uncover patterns."
    );
  }

  // Fatigue pattern
  const fatigueCount =
  symptomFrequency.filter(
    (symptom) =>
      symptom === "Fatigue"
  ).length;

if (
  fatigueCount >= 3
)
   {
    insights.push(
      "Fatigue appears frequently in your wellness logs. Sleep quality and hydration may be worth paying closer attention to."
    );
  }

  // Positive reinforcement
  if (
    averageSleep >= 7 &&
    averageStress < 5
  ) {
    insights.push(
      "Your recent wellness patterns look balanced. Consistent sleep and lower stress seem to be positively supporting your routine 🌸"
    );
  }

  // fallback
  if (insights.length === 0) {
    insights.push(
"Keep logging consistently to unlock stronger personalized wellness patterns and trend analysis."    );
  }

  return insights.slice(0, 3);
}
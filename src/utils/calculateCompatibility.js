function normalizeText(text) {
  return String(text || "").toLowerCase();
}

function hasSharedWord(firstValue, secondValue) {
  const firstText = normalizeText(firstValue);
  const secondText = normalizeText(secondValue);

  return (
    firstText.includes("chill") && secondText.includes("chill")
  ) || (
    firstText.includes("fast") && secondText.includes("fast")
  ) || (
    firstText.includes("normal") && secondText.includes("normal")
  ) || (
    firstText.includes("twisty") && secondText.includes("twisty")
  );
}

export function calculateCompatibility(profile, rider) {
  const checks = [];

  function addCheck(label, passed, points) {
    checks.push({
      label,
      passed,
      points: passed ? points : 0
    });
  }

  addCheck("Same city", profile.city === rider.city, 25);
  addCheck("Same bike type", profile.bikeType === rider.bikeType, 15);
  addCheck("Similar experience", profile.experience === rider.experience, 15);

  addCheck(
    "Similar riding style",
    hasSharedWord(profile.ridingStyle, rider.ridingStyle),
    20
  );

  addCheck(
    "Connection mode match",
    profile.connectionMode === rider.connectionMode ||
      rider.lookingFor.includes(profile.connectionMode),
    15
  );

  addCheck("Same availability", profile.available === rider.available, 10);

  const score = checks.reduce((total, check) => total + check.points, 0);

  return {
    score,
    checks
  };
}
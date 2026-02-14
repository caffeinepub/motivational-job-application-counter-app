/**
 * Returns an encouraging message based on the current application count
 */
export function getMotivationalMessage(count: number): string {
  if (count === 0) {
    return "Ready to start your journey? Every application is a step forward!";
  }
  
  if (count >= 1 && count <= 4) {
    return "Great start! You're building momentum. Keep it up!";
  }
  
  if (count >= 5 && count <= 9) {
    return "You're on a roll! Your persistence is paying off.";
  }
  
  if (count >= 10 && count <= 19) {
    return "Double digits! Your dedication is impressive. Stay strong!";
  }
  
  if (count >= 20 && count <= 49) {
    return "Wow! You're showing incredible commitment. Success is coming!";
  }
  
  if (count >= 50) {
    return "You're unstoppable! This level of effort will lead to great things!";
  }
  
  return "Keep pushing forward. You've got this!";
}

/**
 * Returns the next milestone target based on the current count
 */
export function getNextMilestone(count: number): number {
  const milestones = [5, 10, 20, 30, 50, 75, 100, 150, 200];
  
  for (const milestone of milestones) {
    if (count < milestone) {
      return milestone;
    }
  }
  
  // If beyond all predefined milestones, return next multiple of 50
  return Math.ceil((count + 1) / 50) * 50;
}


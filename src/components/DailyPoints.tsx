import React from 'react';

const calculatePoints = (currentDate: Date): number => {
  const seasonStart = new Date('2025-03-21'); // Example start date (Spring)

  // Calculate the difference in days between the current date and the start of the season
  const diffTime = currentDate.getTime() - seasonStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)); // Convert milliseconds to days

  // If diffDays is less than 0 (i.e., the current date is before the season starts), return 0 points
  if (diffDays < 0) {
    return 0;
  }

  // Apply the points calculation based on the days since the season started
  let points = 2; // Points for the first day
  if (diffDays > 0) {
    points += Math.floor((diffDays - 1) * 1.6); // Apply the formula for subsequent days
  }

  // If points exceed 1000, convert to "K"
  if (points > 1000) {
    points = points / 1000; // Convert to 'K' as a number (e.g., 28745 becomes 28.745)
  }

  return points;
};

const DailyPoints: React.FC = () => {
  const today = new Date();
  const points = calculatePoints(today);

  // Format points to display with "K" if over 1000
  const formattedPoints = points > 1000 ? `${Math.round(points)}K` : points;

  return (
    <div className="daily-points">
      <h3>Today's Points</h3>
      <div>{formattedPoints}</div>
    </div>
  );
};

export default DailyPoints;

export function calculateDailyPoints(): string {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed
    const day = today.getDate();
  
    // Example: defining seasons by month
    const seasonStartMonths = { spring: 2, summer: 5, autumn: 8, winter: 11 };
  
    let seasonStart = new Date(today.getFullYear(), 2, 1); // default: Spring
    Object.values(seasonStartMonths).forEach((m) => {
      const tempDate = new Date(today.getFullYear(), m, 1);
      if (today >= tempDate) seasonStart = tempDate;
    });
  
    const dayOfSeason = Math.floor(
      (today.getTime() - seasonStart.getTime()) / (1000 * 3600 * 24)
    ) + 1;
  
    let points = 2;
    if (dayOfSeason === 2) points = 3;
    else if (dayOfSeason > 2) {
      let prevPrev = 2;
      let prev = 3;
      for (let i = 3; i <= dayOfSeason; i++) {
        const current = Math.round(prevPrev + prev * 0.6);
        prevPrev = prev;
        prev = current;
        points = current;
      }
    }
  
    return points >= 1000 ? `${Math.round(points / 1000)}k` : points.toString();
  }
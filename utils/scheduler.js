export function isTaskActive(task, now = new Date()) {
  if (!task.schedule) return true;

  const start = new Date(task.schedule.startDate);
  const end = task.schedule.endDate
    ? new Date(task.schedule.endDate)
    : null;

  if (now < start) return false;
  if (end && now > end) return false;

  const repeat = task.schedule.repeat;

  if (!repeat || repeat.type === "none") return true;

  const diffMs = now - start;

  switch (repeat.type) {
    case "hour":
      return diffMs % (repeat.interval * 60 * 60 * 1000) < 60000;

    case "day":
      return diffMs % (repeat.interval * 24 * 60 * 60 * 1000) < 60000;

    case "month":
      return now.getDate() === start.getDate();

    case "year":
      return (
        now.getDate() === start.getDate() &&
        now.getMonth() === start.getMonth()
      );

    default:
      return true;
  }
}

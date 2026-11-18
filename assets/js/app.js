const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
const time = now.toLocaleTimeString();
export const dataDate = {
  year: year,
  month: month,
  date: date,
  dayName: dayName,
  time: time,
};

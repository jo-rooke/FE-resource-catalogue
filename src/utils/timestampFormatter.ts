export function timestampFormatter(timestamp: string): string {
  const months = [
    { no: "01", name: "Jan" },
    { no: "02", name: "Feb" },
    { no: "03", name: "Mar" },
    { no: "04", name: "Apr" },
    { no: "05", name: "May" },
    { no: "06", name: "Jun" },
    { no: "07", name: "Jul" },
    { no: "08", name: "Aug" },
    { no: "09", name: "Sep" },
    { no: "10", name: "Oct" },
    { no: "11", name: "Nov" },
    { no: "12", name: "Dec" },
  ];
  const indexOfT = timestamp.indexOf("T");
  const date = timestamp.substring(0, indexOfT);
  const time = timestamp.substring(indexOfT + 1, indexOfT + 6);
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day =
    date.substring(8, 9) === "0"
      ? date.substring(9, 10)
      : date.substring(8, 10);
  const monthName = months.filter((m) => m.no === month)[0].name;
  return `${time}, ${day} ${monthName} ${year}`;
}

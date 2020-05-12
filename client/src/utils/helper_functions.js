export const format_date_display = unformatted_date => {
  const date = new Date(unformatted_date)
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formatted_date = `${month}/${day}/${year}`
  return formatted_date;
}
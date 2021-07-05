// Parse date fields
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "en-UK",
  timeZoneName: "short",
}

const humanReadableDateTime = (date, options) => {
  let d = new Date(date)
  return d.toLocaleString(options)
}

export default humanReadableDateTime

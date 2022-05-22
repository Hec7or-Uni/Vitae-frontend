const DEL = '-'

function zfill (number, width) {
  width -= number.toString().length
  if (width > 0) { return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number }
  return number + ''
}

export function toTimestamp (date) {
  return new Date(date).getTime()
}

export function fromTimestamp (timestamp) {
  const date = new Date(timestamp)
  return String(date.getFullYear()) + DEL + zfill(String(date.getMonth() + 1), 2) + DEL + zfill(String(date.getDate()), 2)
}

export function fromDate (date) {
  return String(date.getFullYear()) + DEL + zfill(String(date.getMonth() + 1), 2) + DEL + zfill(String(date.getDate()), 2)
}

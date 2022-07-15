export function readCookie(name: string, source: string) {
  let fullName = name + "="
  let ca = source.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(fullName) === 0) {
      return (c.substring(fullName.length, c.length))
    }
  }
  return (undefined)
}
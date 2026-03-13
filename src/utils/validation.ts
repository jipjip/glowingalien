// src/utils/validation.ts
export function isValidUsername(username: string): boolean {
  // Discord-stijl: 3–32 tekens, letters/nummers/._-, geen spaties, geen begin/einde punt of underscore
  const regex = /^(?=.{3,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
  return regex.test(username);
}

export function isValidPassword(password: string): boolean {
  // Minimaal 8 tekens, 1 hoofdletter, 1 kleine letter, 1 cijfer, 1 speciaal teken
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  return regex.test(password);
}
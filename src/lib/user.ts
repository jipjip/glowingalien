import prisma from "./db";

export async function findOrCreateUser(username: string) {
  let user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    user = await prisma.user.create({
      data: { username }
    });
  }
  return user;
}

export function validateUsername(username: string) {
  // max 16 tekens
  if (username.length > 16) return false;

  // alleen alfanumeriek + !@$%*()?|-_=+
  const regex = /^[a-zA-Z0-9!@\$%\*\(\)\?\|\-\_=+]+$/;
  return regex.test(username);
}
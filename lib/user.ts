import { compareSync } from "bcrypt-ts"; 
import database from "./database";

type User = {
  email: string;
  password?: string,
  nickname: string;
  name: string;
};

export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await database.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    return { email: user.email, nickname: user.nickname, name:user.name };
  }

  return null;
}

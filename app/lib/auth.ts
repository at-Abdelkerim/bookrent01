import NextAuth, {
  CredentialsSignin,
  NextAuthConfig,
  type DefaultSession,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "./db";

declare module "next-auth" {
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

export class CustomError extends CredentialsSignin {
  CustomError(code: string) {
    this.code = code;
  }
}

const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("USER:", auth?.user?.role);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (!!auth?.user)
        if (auth?.user.role === "customer")
          if (isOnDashboard) return Response.redirect(new URL("/", nextUrl));
          else return true;
        else if (isOnDashboard) return true;
        else return Response.redirect(new URL("/dashboard", nextUrl));
      else if (isOnDashboard) return false;
      else return true;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  providers: [
    Credentials({
      id: "old",
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (user) {
            if (await bcryptjs.compare(password, user.password)) {
              return user;
            }
            throw new CustomError("Invalid password");
          }
          throw new CustomError("Invalid email");
        }
        throw new CustomError("Invalid credentials");
      },
    }),
    Credentials({
      id: "new",
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            phoneNumber: z.string(),
            password: z.string(),
            confirmPassword: z.string(),
            name: z.string(),
            location: z.string(),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const {
            email,
            phoneNumber,
            password,
            confirmPassword,
            name,
            location,
          } = parsedCredentials.data;
          const userCount = await prisma.user.count({
            where: { OR: [{ email }, { phoneNumber }] },
          });
          if (!userCount || userCount < 1) {
            if (password === confirmPassword) {
              const hashedPassword = await bcryptjs.hash(password, 10);
              const newUser = await prisma.user.create({
                data: {
                  email,
                  phoneNumber,
                  password: hashedPassword,
                  name,
                  location,
                },
                select: {},
              });
              return newUser;
            }
            throw new CustomError("Password not match");
          }
          throw new CustomError("Email / Phone Number already register");
        }
        throw new CustomError("Invalid credentials");
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

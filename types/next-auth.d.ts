import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // User Interface
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city?: string;
    apiToken: string;
  }

  // JWT Interface
  interface jwt {
    id: string;
    email: string;
    city: string;
    apiToken: string;
  }

  // Session Interface
  interface Session {
    user: {
      id: string;
      email: string;
      city: string;
      apiToken: string;
    } & DefaultSession["user"];
  }
}

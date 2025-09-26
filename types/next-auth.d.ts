import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // User Interface
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    city?: string;
    apiToken: string;
  }

  // Session Interface
  interface Session extends DefaultSession {
    user: User;
  }

  // JWT Interface
  interface jwt {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    city?: string;
    apiToken: string;
  }
}

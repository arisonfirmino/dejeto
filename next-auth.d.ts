export declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      avatar: string | null;
    };
  }

  interface User extends AdapterUser {
    id: string;
    username: string;
    avatar: string | null;
  }
}

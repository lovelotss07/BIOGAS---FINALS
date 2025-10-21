// This file only exports the AuthContext for use in useAuth.ts
export interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string,
    info?: {
      name: string;
      birthdate: string;
      gender: string;
      phone?: string;
      profilePic?: string;
    }
  ) => Promise<boolean>;
  logout: () => void;
}

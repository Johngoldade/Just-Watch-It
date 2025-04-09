export interface User {
  id: number | null;
  username: string | null;
  email: string | null;
  password: string | null;
  favorites: number | null;
  primaryGroup: number | null;
}

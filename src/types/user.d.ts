export interface UserCookies {
  id: number;
  email: string;
  role: number | null; // dépend si `id_droit` peut être null
  pseudo: string;
}

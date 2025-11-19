export interface UserCookies {
  id: number;
  email: string;
  role: number | null; // dépend si `id_droit` peut être null
  pseudo: string;
}

import { SexeEnum } from "./enums";

export interface User {
  id_user: number;
  email: string;
  pseudo: string;
  nom: string | null;
  prenom: string | null;
  date_naissance: Date;
  password: string;
  sexe: SexeEnum | null;
  id_droit: number | null;
  icone: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

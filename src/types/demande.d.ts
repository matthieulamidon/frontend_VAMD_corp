import { JeuxEquipe } from "./enums";
import { User } from "./users";

import { Poste, SousRole } from "./enums";

export interface DemandeJoueur {
  user: User | null;
  id_equipe: number;
  id_user: number;
  poste: Poste;
  sous_role: SousRole | null;
}

export interface DemandeCoach {
  user: User | null;
  id_user: number;
  jeu: JeuxEquipe;
}

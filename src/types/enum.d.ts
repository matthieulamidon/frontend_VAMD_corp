export enum JeuxEquipe {
  LEAGUEOFLEGENDES = "LEAGUEOFLEGENDES",
  VALORANT = "VALORANT",
  FORTNITE = "FORTNITE",
}

export enum SexeEnum {
  HOMME = "HOMME",
  FEMME = "FEMME",
  AUTRE = "AUTRE",
}

export enum Poste {
  COACH = "COACH",
  FORTNITE = "FORTNITE", // IL N'y a pas de roles car ce jeu manque de stratégie
  TOPLANER = "TOPLANER", // LOL
  MIDLANER = "MIDLANER", // LOL
  BOTLANER = "BOTLANER", // LOL
  JUNGLER = "JUNGLER", // LOL
  SUPORT = "SUPORT", // LOL
  DUELISTS = "DUELISTS", // VALO
  SENTINELS = "SENTINELS", // VALO
  INITIATORS = "INITIATORS", // VALO
  CONTROLLERS = "CONTROLLERS", // VALO
  POLYVALENT = "POLYVALENT", // VALO il y a quatre roles dans valo mais 5 joueur dont un qui change de role en fonction de la map
}

export enum SousRole {
  TITULAIRE = "TITULAIRE",
  REMPLACANT = "REMPLACANT",
  COACH = "COACH",
  CHEFDEQUIPE = "CHEFDEQUIPE",
  MEMBRE = "MEMBRE",
  INSCRIPTION = "INSCRIPTION", // dans le process d'INSCRIPTION il seul le coach le voie
}

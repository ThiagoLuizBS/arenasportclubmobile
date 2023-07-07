export declare global {
  export interface favoritesChampionships {
    idChampionship: string;
    img: string;
    imgChampionship: string;
    name: string;
  }

  export interface favoritesTeams {
    idTeam: string;
    img: string;
    name: string;
  }

  declare module "*.jpg";
}

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

  export interface championship {
    _id: {
      championship: string;
    };
    matchs: match[];
  }

  export interface match {
    status: string;
    time: string;
    schedule: string;
    scoreHome: string;
    scoreAway: string;
    teams: {
      homeId: string;
      homeName: string;
      homeImg: string;
      teamHomeHref: string;
      awayId: string;
      awayName: string;
      awayImg: string;
      teamAwayHref: string;
    };
    events: {
      time: string;
      type: string;
    }[];
  }

  declare module "*.png";
}

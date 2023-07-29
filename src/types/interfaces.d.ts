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
    name: string;
    img: string;
    imgChampionship: string;
    idChampionship: string;
    matchs: match[];
  }

  export interface team {
    img: string;
    name: string;
    url: string;
    idTeam: string;
    infos: [{ title: string; description: string }];
    titles: [{ year: string; name: string; logo: string }];
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

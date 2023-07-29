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

  export interface championshipFavorite {
    name: string;
    img: string;
    imgChampionship: string;
    idChampionship: string;
  }

  export interface team {
    img: string;
    name: string;
    url: string;
    idTeam: string;
    infos: [{ title: string; description: string }];
    titles: [{ year: string; name: string; logo: string }];
  }

  export interface teamFavorite {
    img: string;
    name: string;
    idTeam: string;
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

  export interface news {
    _id: {
      category: string;
      priority: string;
    };
    news: [
      {
        href: string;
        title: string;
        subtitle: string;
        img: string;
      }
    ];
  }

  declare module "*.png";
}

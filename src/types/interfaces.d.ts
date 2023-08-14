export declare global {
  export interface championshipDate {
    _id: {
      day: string;
    };
    matchs: match[];
  }

  export interface championshipMatchs {
    _id: {
      championship: string;
      idChampionship: string;
    };
    name: string;
    img: string;
    imgChampionship: string;
    idChampionship: string;
    matchs: match[];
  }

  export interface championship {
    _id: string;
    idChampionship: string;
    url: string;
    name: string;
    img: string;
    imgChampionship: string;
    priority: number;
    statistics: {
      name: string;
      table: { num: string; player: string; team: string; value: string }[];
    }[];
    table: {
      phase: string;
      group: string;
      table: {
        num: string;
        team: string;
        points: string;
        games: string;
        victorys: string;
        draws: string;
        loses: string;
        goaldiference: string;
      }[];
    }[];
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
    locality: string;
    infos: [{ title: string; description: string }];
    titles: [{ year: string; name: string; logo: string }];
  }

  export interface teamFavorite {
    img: string;
    name: string;
    idTeam: string;
  }

  export interface match {
    championship: string;
    idChampionship: string;
    idMatch: string;
    status: string;
    time: string;
    schedule: string;
    scoreHome: string;
    scoreAway: string;
    stadium: string;
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

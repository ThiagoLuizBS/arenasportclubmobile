import api from "./api";

class MatchService {
  getMatch(id: string) {
    return api.get(`/matchs/id/${id}`);
  }

  getMatchsByDate(date: string, favorites: championshipFavorite[]) {
    const array = [];
    for (let index = 0; index < favorites.length; index++) {
      array.push(favorites[index].idChampionship);
    }
    if (array.length === 0) array.push(1);
    return api.get(
      `/matchs/date/${date}/${array.map((n) => `${n}`).join("-")}`
    );
  }

  getFutureMatchsByChampionship(id: string) {
    return api.get(`/matchs/championship/future/${id}`);
  }

  getPastMatchsByChampionship(id: string) {
    return api.get(`/matchs/championship/past/${id}`);
  }

  getFutureMatchsByTeam(id: string) {
    return api.get(`/matchs/team/future/${id}`);
  }

  getPastMatchsByTeam(id: string) {
    return api.get(`/matchs/team/past/${id}`);
  }
}

export default new MatchService();

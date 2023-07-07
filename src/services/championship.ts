import api from "./api";

class ChampionshipService {
  getChampionships(search: string) {
    return api.get(`/championships?name=${search}`);
  }

  getChampionshipById(id: string) {
    return api.get(`/championship/id/${id}`);
  }

  getChampionshipsPriority() {
    return api.get(`/championships/priority`);
  }
}

export default new ChampionshipService();

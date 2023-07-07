import api from "./api";

class TeamService {
  getTeams(search: string) {
    return api.get(`/teams?name=${search}`);
  }

  getTeamById(id: string) {
    return api.get(`/team/id/${id}`);
  }
}

export default new TeamService();

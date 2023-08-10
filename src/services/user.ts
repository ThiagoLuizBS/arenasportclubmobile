import api from "./api";

class UserService {
  getPost(name: string, email: string, password: string) {
    let user = { name: name, email: email, password: password };
    return api.post(`/postUser`, user);
  }

  getUser(email: string, password: string) {
    let user = { email: email, password: password };
    return api.post(`/getUser`, user);
  }

  setFavorites(
    id: string,
    teams: teamFavorite[],
    championships: championshipFavorite[]
  ) {
    let favorites = { id: id, teams: teams, championships: championships };
    return api.put(`/setFavorites`, favorites);
  }

  haveFavorites(id: string) {
    return api.get(`/haveFavorites/${id}`);
  }

  getFavorites(id: string) {
    return api.get(`/getFavorites/${id}`);
  }
}

export default new UserService();

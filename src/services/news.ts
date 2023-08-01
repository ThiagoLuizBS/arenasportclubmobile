import api from "./api";

class NewsService {
  getAllNews() {
    return api.get(`/news`);
  }
}

export default new NewsService();

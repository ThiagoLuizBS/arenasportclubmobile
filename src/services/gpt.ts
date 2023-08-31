import api from "./api";

class gptService {
  async getGPTLocalization(
    localization: string[],
    language: string | undefined
  ) {
    if (language === "en") language = "English";
    else language = "Português";
    const object = { localization: localization, language: language };
    return await api.post(`/gptLocalization`, object);
  }

  async getGPTPredict(idMatch: string, language: string | undefined) {
    if (language === "en") language = "English";
    else language = "Português";
    const object = { idMatch: idMatch, language: language };
    return await api.post(`/gptPredict`, object);
  }
}

export default new gptService();

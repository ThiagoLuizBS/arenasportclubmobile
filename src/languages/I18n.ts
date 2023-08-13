import { I18n } from "i18n-js";

// Languages.
import en from "./english.json";
import pt from "./portugues.json";

// Configuring translations.

const i18n = new I18n({ en, pt });
i18n.locale = "pt";

// Exports translations lib.
export default i18n;

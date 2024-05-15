const i18next = require('../configs/i18n.config');

const languageMiddleware = (req, res, next) => {
    const defaultLanguage = 'en';
    const supportedLanguages = ['en', 'vi'];

    const acceptLanguage = req.headers['accept-language'];

    let language = defaultLanguage;

    if (acceptLanguage) {
        const requestedLanguages = acceptLanguage.split(',').map(lang => lang.split(';')[0]);
        language = requestedLanguages.find(lang => supportedLanguages.includes(lang)) || defaultLanguage;
    }

    req.language = language;
    i18next.changeLanguage(language);

    next();
};

module.exports = languageMiddleware;

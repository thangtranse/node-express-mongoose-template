const path = require("path");
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        fallbackLng: 'vi',
        preload: ['en', 'vi'],
        backend: {
            loadPath: path.resolve(__dirname, "../locales/{{lng}}.json"),
        }
    }, (err, t) => {
        if (err) return console.error(err);
        console.log('i18next is ready!');
        console.log(t('node.welcome'));
        console.log(t('node.welcome', { lng: 'en' }));
    });

module.exports = i18next;

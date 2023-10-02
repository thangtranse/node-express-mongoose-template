const whiteList = [
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "data:",
  "ws:",
  "wss:",
  "blob:",
];

module.exports = {
  default: {
    contentSecurityPolicy: {
      directives: {
        "script-src": whiteList,
        "img-src": ["'self'", "https: data: blob:"],
        "connect-src": whiteList,
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: true,
  },
};

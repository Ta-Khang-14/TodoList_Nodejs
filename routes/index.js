const postRoute = require("./particals/postRoute");
const registerRoute = require("./particals/registerRoute");

function route(app) {
    app.use("/api/me/posts", postRoute);
    app.use("/api/auth", registerRoute);
}

module.exports = route;

const express = require("express");
const fs = require("fs")
const router = express.Router();
const { StoreRunController }  = require("./controllers/store-run");
const { Middleware }  = require("./middlewares/index.middleware");

let storeRun = new StoreRunController();
let middleware = new Middleware();
let listRouteName = fs.readdirSync(`${__dirname}/routes`);
console.log(listRouteName);

for (const routeName of listRouteName) {
    let name = routeName.replace(".js","")
    if(name != "store-run")
        router.use("/" + name,middleware.authenticate, middleware.message, require(`./routes/${name}`))
    else
        router.use("/",
            middleware.registration,
            middleware.login,
            middleware.passwordChange,
            middleware.authenticate, 
            middleware.message, 
            require(`./routes/${name}`)
        )
}

// router.use(storeRun.pageNotFound);
router.use(express.urlencoded({extended: true}))

router.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
module.exports = router;
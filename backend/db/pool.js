const {Pool} = require("pg");
module.exports= new Pool(
    {
        host:"localhost",
        user:"yash",
        database:"community",
        password:"yashwolf",
        port:5432
    }
);
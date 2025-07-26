const {Pool} = require("pg");
module.exports= new Pool(
    {
        host:"localhost",
        user:"yash",
        database:"community",
        password:"yash7887",
        port:5432
    }
);

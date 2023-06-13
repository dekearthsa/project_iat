const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try{
        const getToken = req.headers['access-token']
        // console.log(getToken)
    if(getToken === "" || getToken === undefined || getToken === null || getToken === NaN){
        // console.log("send out")
        res.sendStatus(401)
    }else{
        try{
            const decode = jwt.verify(getToken, process.env.TOKEN_KEY);
            // console.log("jwt verify ==> ", decode);
            // next();
        }catch(err){
            console.log("mid ware err ===>", err);
            res.sendStatus(401);
        }
    }
    return next();
    }catch(err){
        console.log(err);
    }
    
}

module.exports = verifyToken;
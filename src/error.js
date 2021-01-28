const {retun_json} = require('./controller/Controller');
module.exports = (err)=>{
    if(err instanceof SyntaxError && err.type=="entity.parse.failed"){
        if(err.message.includes('JSON')){
        errorMessage = retun_json('Invalid JSON payload passed',null,'error');
        return errorMessage;
        }
    }
    else{
        console.log(err);
        errorMessage = retun_json(err.message,null,'error');
        return errorMessage;
    }
    
    return errorMessage;
}
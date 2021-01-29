var authController = require('./controller/Controller');
module.exports = (err)=>{
    if(err instanceof SyntaxError && err.type=="entity.parse.failed"){ //check for Invalid JSON error
        if(err.message.includes('JSON')){
        errorMessage = authController.retun_json('Invalid JSON payload passed',null,'error');  //get error response
        return errorMessage;
        }
    }
    else{
        errorMessage = authController.retun_json(err.message,null,'error');//get error response for error (not Invalid JSON)
        return errorMessage;
    }
    
    return errorMessage;
}
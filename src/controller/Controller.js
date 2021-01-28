const myDetails = {
    name: "Odiri Udele",
    github: "@OdiriUdele",
    email: "odiriudele@gmail.com",
    mobile: "07064624515",
    twitter: "@SantaOdiri"
}

module.exports.validate_rule = (req,res)=>{
        if(res.locals.error != undefined){
            error =  res.locals.error.details[0];
            var message = error.message;
            var response =  retun_json(message,null,'error');
            console.log(res.status(400));
            res.json(response);
        }else{
            res.end('welcome to home page');
        }
}

module.exports.return_details = async(req,res)=>{
    var message = "My Rule-Validation API";
    var response =  retun_json(message,myDetails,'success');
    res.json(response);
}


retun_json = (message,data,status)=>{
 return {
    "message":message+'.',
    "status": status,
    "data":  data
 }
}
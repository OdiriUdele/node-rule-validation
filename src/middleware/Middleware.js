const Joi = require('joi'); //add joi dependency
const { object, string,array } = Joi.types();
const handleError = require('../error');


const schema = Joi.object({ //define joi validation schema
    rule:  Joi.object().keys({
        field: Joi.string().required(),
        condition: Joi.alternatives().try('eq', 'neq','gt', 'gte','contains').required(),
        condition_value: Joi.any().required(),
    }).required(), //set rule field to required
    data:Joi.alternatives().try(object,string,array).required() //set data field to required
});

const  RuleDataExists = async(req,res,next)=>{
    try {
        const value = await schema.validateAsync(req.body); //validate schema
        res.status(200);
        next();  //if middleware is satisfied then proceed to route method
    }
    catch (err) { 
        errorMessage = handleError(err.details[0]);//call error handler function in event of an error
        res.status(400).json(errorMessage);
    }
}

module.exports= {RuleDataExists};//export middleware
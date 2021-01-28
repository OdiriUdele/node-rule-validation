const Joi = require('joi');
const { object, string,array } = Joi.types();
const handleError = require('../error');


const schema = Joi.object({
    rule:  Joi.object().keys({
        field: Joi.string().required(),
        condition: Joi.any().valid('eq', 'neq','gt', 'gte','contains').required(),
        condition_value: Joi.any().required(),
    }).required(),
    data:Joi.alternatives().try(object,string,array).required()
});

const  RuleDataExists = (req,res,next)=>{
    try {
        const value = schema.validate(req.body);
        next();
    }
    catch (err) { 
        errorMessage = handleError(err.details[0]);
        res.status(400).json(errorMessage);
    }
}


module.exports= {RuleDataExists};
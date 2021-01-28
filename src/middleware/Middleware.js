const Joi = require('joi');
const { object, string,array } = Joi.types();

const schema = Joi.object({
    rule:  Joi.object().keys({
        field: Joi.string().required(),
        condition: Joi.any().valid('eq', 'neq','gt', 'gte','contains').required(),
        condition_value: Joi.any().required(),
    }).required(),
    data:Joi.alternatives().try(object,string,array).required()
});

const  RuleDataExists = async (req,res,next)=>{
    try {
        const value = await schema.validateAsync(req.body);
        next();
    }
    catch (err) { 
        res.locals.error = err;
        next();
    }
}


module.exports= {RuleDataExists};
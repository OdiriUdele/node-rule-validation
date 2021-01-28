var validController = require('./ValidateConditionController')

const myDetails = {
    name: "Odiri Udele",
    github: "@OdiriUdele",
    email: "odiriudele@gmail.com",
    mobile: "07064624515",
    twitter: "@SantaOdiri"
}

module.exports.validate_rule = (req,res)=>{
    let rule = req.body.rule;
    let data = req.body.data;
    field = rule.field.split(".");
    if(field.lenght > 3){
        var response =  this.retun_json(`Invalid Field Nesting`,null,'error');
        res.status(400).json(response);
    }
    field_exist = check_field(field,data);//check if rule field exists in data attribute
    console.log(field_exist);
    if(!field_exist[0]){
        var response =  this.retun_json(`field ${rule.field} is missing from data`,null,'error');
        res.status(400).json(response);
    }else{
        check_condition = validate_condition(field_exist[1],rule);
        var validRes = validation_result(check_condition,field_exist[1],rule);
        if(check_condition){
            var response =  this.retun_json(`field ${rule.field} successfully validated`,validRes,'success');
            res.status(200).json(response);
        }else{
            var response =  this.retun_json(`field ${rule.field} failed validation`,validRes,'error');
            res.status(400).json(response);
        }
    }
}

module.exports.return_details = async(req,res)=>{
    var message = "My Rule-Validation API";
    var response =  retun_json(message,myDetails,'success');
    res.json(response);
}


module.exports.retun_json = (message,data,status)=>{
 return {
    "message":message+'.',
    "status": status,
    "data":  data
 }
}

validation_result = (valid,data,rule)=>{
    return {
        "validation": {
            "error": !valid,
            "field": rule.field,
            "field_value": data,
            "condition": rule.condition,
            "condition_value": rule.condition_value
          }
    }
}

check_field = (field,data)=>{
    type = typeof data;//fetch datatype of data attribute
    bool=[false,null];//initialise boolean value
    switch (type) {
        case 'object':
            if(data.hasOwnProperty(field[0])){//check if data has a property named field value
                bool = [true,data[field[0]]];
                for(var i=1;i<field.length;i++){//heck if data has a property named field value in the case of nested field values
                    bool = [false,null];
                    if(data[field[i-1]].hasOwnProperty(field[i])){
                       bool = [true,data[field[i-1]][field[i]]];
                    }
                }
            }
            return bool;
        case 'array':
            if(data.size() >=field){
                return [true,data[field]];
            }
          return bool;
        case 'string':
            if(data.length >= field){
                value = [...data];
                return [true,value[field]];
            }
          return bool;
        default:
           return bool;
      }
}

validate_condition = (data,rule)=>{
    condition = rule.condition//fetch condition from rule attribute
    switch (condition) {
        case 'eq':
            bool = validController.check_if_equal(data,rule.condition_value)
            return bool;
        case 'neq':
           bool = validController.check_if_not_equal(data,rule.condition_value)
          return bool;
        case 'gt':
            bool = validController.check_if_greater_than(data,rule.condition_value)
          return bool;
        case 'gte':
            bool = validController.check_if_greater_than_equal(data,rule.condition_value)
          return bool;
        case 'contains':
            bool = validController.check_if_contains(data,rule.condition_value)
          return bool;
      }
}
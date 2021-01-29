var validController = require('./ValidateConditionController') //call ValidateConditionController

const myDetails = {
    name: "Odiri Udele",
    github: "@OdiriUdele",
    email: "odiriudele@gmail.com",
    mobile: "07064624515",
    twitter: "@SantaOdiri"
} //default author attributes

module.exports.validate_rule = (req,res)=>{
    try{
    let rule = req.body.rule; //fetch rule attribute
    let data = req.body.data; //fetch data attribute from request body
    field = rule.field.split("."); //convert rule.field to array
    if(field.lenght > 3){
        var response =  this.retun_json(`Invalid Field Nesting`,null,'error'); //get error response when rule.field nesting level is greater than 2
        res.status(400).json(response); //return error with status code 400
    }
    field_exist = check_field(field,data);//check if rule field exists in data attribute returns array['boolean','data.field.value']
    if(!field_exist[0]){
        var response =  this.retun_json(`field ${rule.field} is missing from data`,null,'error');//get error response when rule.field doesnt exist in data
        res.status(400).json(response);//return error with status code 400
    }else{
        check_condition = validate_condition(field_exist[1],rule); //check rule.conditions to know if they are valid(retuns true or false)
        var validRes = validation_result(check_condition,field_exist[1],rule);  //call function to get response for validation status (success or error)
        if(check_condition){
            var response =  this.retun_json(`field ${rule.field} successfully validated`,validRes,'success');
            res.status(200).json(response);
        }else{
            var response =  this.retun_json(`field ${rule.field} failed validation`,validRes,'error');
            res.status(400).json(response);
        }
    }
    }catch(err){
        var response =  this.retun_json(err.message,null,'error');
        res.status(400).json(response);
    }
}

//return Author details response for GET Request
module.exports.return_details = (req,res)=>{
    var message = "My Rule-Validation API";
    var response =  this.retun_json(message,myDetails,'success');
    res.json(response);
}

//set response structure for HTTP Request
module.exports.retun_json = (message,data,status)=>{
 return {
    "message":message+'.',
    "status": status,
    "data":  data
 }
}
//response structure for rule validation
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
//check if rule.field exists in data (returns array containing check result and field value )
check_field = (field,data)=>{
    type = typeof data;//fetch datatype of data attribute
    bool=[false,null];//initialise boolean value with (false and null)
        switch (type) {
            case 'object':
                if(data.hasOwnProperty(field[0])){//check if data has a property named field value
                    bool = [true,data[field[0]]];
                    for(var i=1;i<field.length;i++){//check if data.field has nested field in the case of nested rule.field values
                        bool = [false,null];
                        if(data[field[i-1]].hasOwnProperty(field[i])){
                            bool = [true,data[field[i-1]][field[i]]]; 
                        }
                    }
                }
                return bool;
            case 'array':
                if(data.size() >=field){ //check if field exists when data is an array
                    return [true,data[field]];
                }
            return bool;
            case 'string':
                if(data.length >= field){ //check if field exists when data is a string
                    value = [...data];
                    return [true,value[field]]; //returns the status and data.field value
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
            bool = validController.check_if_equal(data,rule.condition_value); //call function to check for an equalTo condition
            return bool;
        case 'neq':
           bool = validController.check_if_not_equal(data,rule.condition_value); //call function to check for a NotEqualTo condition
          return bool;
        case 'gt':
            bool = validController.check_if_greater_than(data,rule.condition_value); //call function to check for a greater than condition
          return bool;
        case 'gte':
            bool = validController.check_if_greater_than_equal(data,rule.condition_value); //call function to check for a greater than Equal condition
          return bool;
        case 'contains':
            bool = validController.check_if_contains(data,rule.condition_value); //call function to check for a greater than contains condition
          return bool;
      }
}
//check if data.field and rule.condition_value meet "eq" rule.condition
module.exports.check_if_equal = (data,value)=>{
    if(data == value){
        return true;
    }
    return false;
}
//check if data.field and rule.condition_value meet "neq" rule.condition
module.exports.check_if_not_equal = (data,value)=>{
    if(data != value){
        return true;
    }
    return false;
}

//check if data.field and rule.condition_value meet "gt" rule.condition
module.exports.check_if_greater_than = (data,value)=>{
    if(data > value){
        return true;
    }
    return false;
}

//check if data.field and rule.condition_value meet "gte" rule.condition
module.exports.check_if_greater_than_equal = (data,value)=>{
    if(data >= value){
        return true;
    }
    return false;
}

//check if data.field and rule.condition_value meet "contains" rule.condition
module.exports.check_if_contains = (data,value)=>{
    if(typeof data == "number"){//converts data.field to string
        data = data.toString();
    }
    if(data.includes(value)){
        return true;
    }
    return false;
}
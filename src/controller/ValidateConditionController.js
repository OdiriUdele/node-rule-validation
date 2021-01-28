module.exports.check_if_equal = (data,value)=>{
    if(data === value){
        return true;
    }
    return false;
}
module.exports.check_if_not_equal = (data,value)=>{
    if(data !== value){
        return true;
    }
    return false;
}

module.exports.check_if_greater_than = (data,value)=>{
    if(data > value){
        return true;
    }
    return false;
}

module.exports.check_if_greater_than_equal = (data,value)=>{
    if(data >= value){
        return true;
    }
    return false;
}

module.exports.check_if_contains = (data,value)=>{
    if(data.includes(value)){
        return true;
    }
    return false;
}



module.exports.SuccessResponse =(status,error,msg,result)=>{
    return { status, error , msg, result}
}

module.exports.ErrorResponse =(status,error,msg,result)=>{
    return { status, error , msg, result}
}
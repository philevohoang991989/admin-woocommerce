export const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
}

export const send_error=(type_error)=>{
    if(type_error !== ''){
        return `${type_error} already exists`
    }

}
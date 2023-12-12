module.exports = (error, req, res, next) => {
    let status = error.status || 500
    // console.log(error.name)
    let message = error.message || "Internal server error"

    switch (error.name) {
        case "BadRequest":
        case "Unauthorized":
            status = 400
            break

        case "SequelizeUniqueConstraintError" :   
        case "SequelizeValidationError" : 
            console.log(error)
            status = 400
            message = error.errors[0].message
            break

        case "notFound" :
            status = 404
            message = "Lodging not found"
            break

        case "JsonWebTokenError" : 
        case "InvalidToken" :
            status = 401
            message = "Invalid token"
            break

        case "Forbidden" :
            status = 403
            message = "You are not authorized"
            break
    
    }

    res.status(status).json({message})
}
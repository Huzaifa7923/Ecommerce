const notFound=(req,res,next)=>{
    console.log("NOT FOUND MIDDLEWARE")
    const error=new Error(`Not found - ${req.originalUrl}`)
    console.log(`Not found ka error => ${error}`)
    res.status(404)
    next(error);
}

// ErrorHandler.js
const errorHandler = (err, req, res, next) => {

    console.log("inside error Handler")

    let statusCode=res.statusCode===200?500:res.statusCode;
    let message=err.message;

    console.log(`inside errorHandler error is :${message}`)
    res.status(statusCode).json({
        message,
        stack : process.env.NODE_ENV==='production' ? 'null' : err.stack,
})
}

export { notFound, errorHandler };
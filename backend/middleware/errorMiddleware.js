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
    // console.log(req.params);
    // // Log information about the route
    // console.log(`Route: ${req.method} ${req.originalUrl}`);
    
    // // Log route parameters
    // console.log("Route Parameters:", req.params);

    // // Log query parameters
    // console.log("Query Parameters:", req.query);

    // // Log request body
    // console.log("Request Body:", req.body);


    let statusCode=res.statusCode===200?500:res.statusCode;
    let message=err.message;

    console.log(`inside errorHandler error is :${message}`)
    res.status(statusCode).json({
        message,
        stack : process.env.NODE_ENV==='production' ? 'null' : err.stack,
})
}

export { notFound, errorHandler };
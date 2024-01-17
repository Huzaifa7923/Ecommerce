import jwt from 'jsonwebtoken'
//creating a token
const generateToken=(res,userId)=>{
         const token=jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:'30d'
        })

        //set token as httponly with name jwt
        res.cookie('jwt',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV !=='development',
            sameSite:'strict',
            maxAge:30*24*60*60*1000
        })
}
export default generateToken;
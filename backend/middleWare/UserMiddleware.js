import jwt from "jsonwebtoken";``

const userMiddleWare = (req , res , next) =>{
    const  auth = req.headers.authorization;
    if( auth && auth.startsWith("Bearer ")){
        const token = auth.split(" ")[1];
       try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
       } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
       }
    }else{
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default userMiddleWare;
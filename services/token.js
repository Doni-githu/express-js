import jwt from "jsonwebtoken"


const generateJWTTOKEN = userId => {
    const accessTOKEN = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '30d' })
    return accessTOKEN
}


export { generateJWTTOKEN }
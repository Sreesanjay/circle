import jwt from 'jsonwebtoken';
import env from "./validateEnv";

const maxAge = 3 * 24 * 60 * 60;
const generateToken = (id: string) => {
    return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: maxAge });
};

export default generateToken;
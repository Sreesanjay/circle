import jwt from 'jsonwebtoken';
import env from "./validateEnv";

const REFRESHTOKEN_MAX_AGE = 3 * 24 * 60 * 60;
const ACCESSTOKEN_MAX_AGE = 60 * 15;

const getAccessToken = (email: string, id: string) => {
    return jwt.sign({ email, id }, env.JWT_ACCESSTOKEN_SECRET, { expiresIn: ACCESSTOKEN_MAX_AGE })
}
const generateToken = async (email: string, id: string) => {
    try {
        const refreshToken = jwt.sign({ email, id }, env.JWT_REFRESHTOKEN_SECRET, { expiresIn: REFRESHTOKEN_MAX_AGE });
        const accessToken = getAccessToken(email, id);
        if (accessToken && refreshToken) {
            return Promise.resolve({ accessToken, refreshToken });
        } else {
            return Promise.reject(new Error('Could not generate token'));
        }
    } catch (error) {
        return Promise.reject(error);
    }

};

export default generateToken;
export { getAccessToken } 
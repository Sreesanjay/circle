import User from "../models/userModel"
const generateUsername = async (): Promise<string> => {
    const length = await User.countDocuments()
    return "@user" + length
}

export default generateUsername
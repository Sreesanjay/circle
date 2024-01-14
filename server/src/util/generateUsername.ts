import User from "../models/userModel"
const generateUsername = async(): Promise<string>=>{
    const length = await User.countDocuments()
    console.log("length=>", length)
    return "@user"+length
}

export default generateUsername
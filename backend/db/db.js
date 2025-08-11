import mongoose from "mongoose";


export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO,{
            dbName:"Board",
        }).then(()=>console.log("database connected"))
    } catch (error) {
        console.log("Error in db function", error);
    }
}
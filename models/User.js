import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);



const url = process.env.URL

mongoose.connect(url)
    .then(() => {
        console.log("DB CONNECTED!");
    })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const User = mongoose.model("User", userSchema);

export default User;
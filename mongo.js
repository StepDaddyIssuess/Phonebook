import mongoose, { mongo } from "mongoose";

mongoose.set("strictQuery", false);

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://StepDaddyIssues:${password}@notebook.tarzqon.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=NoteBook`

mongoose.connect(url)
    .then(() => {
        console.log("DB CONNECTED!");
    })

const userSchema = new mongoose.Schema({
    name: String,
    number: String
})

const User = mongoose.model("User", userSchema);

const user = new User({
    name: name,
    number: phoneNumber
})




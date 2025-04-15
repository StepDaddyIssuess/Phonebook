import express from "express";
import cors from "cors";
import User from "./models/User.js"
const app = express();

app.use(express.json());
// app.use(express.static('dist')) 
app.use(cors());


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)



app.get("/info", (req, res) => {

    User.find({})
        .then(users => {
            const currentDate = new Date()
            res.send(`PhoneBook has info for ${users.length}  people <br> ${currentDate}`)
        })
})


app.get("/api/persons", (req, res) => {
    User.find({})
        .then((users) => {
            res.json(users)
        })
        .catch((error) => {
            res.status(404).end()
        })
});

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(user => {
            console.log("deleted", user)
        })
        .catch(err => {
            next(err)
        })

    res.status(204).end()
})


app.post("/api/persons", (req, res, next) => {
    const body = req.body

    if (!body.number) {
        res.status(404).json({
            error: "Number must be valid"
        })
    }
    if (!body.name) {
        res.status(404).json({
            error: "Name must be valid"
        })
    }

    // const nameExist = persons.some(p => p.name === body.name)

    // if (nameExist) {
    //     res.status(409).json({
    //         error: "Name must be unique"
    //     })

    const user = new User({
        "number": body.number,
        "name": body.name,
    })
    user.save()
        .then(savedUser => {
            res.json(savedUser)
        })
        .catch(err => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
    const { number } = req.body

    User.findById(req.params.id)
        .then(user => {

            console.log("Prev data", user)

            user.number = number

            console.log("New Data", user)

            return user.save()
                .then((updatedUser) => {
                    res.json(updatedUser)
                })
        })
        .catch(error => next(error));


})

const errorHandler = (error, req, res, next) => {

    if (error.name === "CastError") {
        return res.status(400).send({
            error: "Something went wrong with the id!"
        })
    } else if (error.name === "ValidationError") {
        return res.status(400).send({
            error: error.message
        })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})
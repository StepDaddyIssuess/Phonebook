import express from "express";
const app = express();

app.use(express.json());


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get("/info", (req, res) => {
    const currentDate = new Date()
    res.send(`PhoneBook has info for ${persons.length} people <br> ${currentDate}`)
})


app.get("/api/persons", (req, res) => {
    res.json(persons)
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id);

    if (person) {
        res.send(person)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})


app.post("/api/persons", (req, res) => {
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

    const nameExist = persons.some(p => p.name === body.name)

    if (nameExist) {
        res.status(409).json({
            error: "Name must be unique"
        })
    } else {
        const person = {
            "number": body.number,
            "name": body.name,
            "id": String(Math.floor(Math.random() * 1000))
        }
        persons = persons.concat(person)
        res.json(person)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("server is running on port 3001")
})
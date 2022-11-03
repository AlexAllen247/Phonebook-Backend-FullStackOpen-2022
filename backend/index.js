require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

app.use(express.json())
app.use(cors())
app.use(express.static("build"))

morgan.token("body", (request, _response) => { return JSON.stringify(request.body) })
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.get("/api/persons", (_request, response) => {
    Person.find({}).then((person) => {
        response.json(person)
    })
})

app.get("/info", (_request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id)
        .then((person) => { response.json(person) })
        .catch((_error) => {
            response.status(404).end()
        })
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: "Name or Number is missing!" })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then((savedPerson) => {response.json(savedPerson)})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
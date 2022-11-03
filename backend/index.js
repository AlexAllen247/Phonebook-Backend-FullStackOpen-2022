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

app.get("/api/persons", (_request, response, next) => {
    Person.find({}).then((person) => { response.json(person) })
        .catch((error) => { next(error) })
})

app.get("/info", (_request, response, next) => {
    Person.find({})
        .then((persons) => {
            response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date().toString()}</p>`)
        })
        .catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => { if (person) { response.json(person) } else { response.status(404).end() } })
        .catch((error) => { next(error) })
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(_result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
    const body = request.body
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then((newPerson) => { response.json(newPerson) })
        .catch((error) => { next(error) })
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    const person = { number: body.number }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedPerson) => { response.json(updatedPerson) })
        .catch((error) => next(error))
})

const errorHandler = (error, _request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "Malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    } else if (error.name === "MongoServerError" && error.code === 11000) {
        return response.status(400).send({ error: "Person already exists!" })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
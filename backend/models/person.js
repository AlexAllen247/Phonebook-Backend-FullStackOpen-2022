require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("Connecting to:", url)
mongoose.connect(url).then(() => {
    console.log("Database Connected")
})
    .catch((error) => {
        console.log("Could not connect to database ", error)
    })

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (number) => {
                return (/^\d{2,3}-\d+/.test(number))
            }
        }
    }
})

personSchema.set("toJSON", {
    "transform": (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }   
})

module.exports = mongoose.model("Person", personSchema)
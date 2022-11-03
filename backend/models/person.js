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

const  personSchema = mongoose.Schema ({
    name: String,
    number: String,
})

personSchema.set("toJSON", {
    "transform": (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)
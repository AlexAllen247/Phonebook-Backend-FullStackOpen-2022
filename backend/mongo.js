const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://AlexAllen247:${password}@cluster0.uyfpf.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({})
    .then((result) => {
        result.forEach((person) => {
            console.log(person.name, person.number)
        });
        mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number  = process.argv[4]
    const person = new Person({
        name: name,
        number: number
    })
    person.save()
    .then((result) => {
        console.log(`Added name ${name} and number ${number} to phonebook`)
        mongoose.connection.close()
    })
}


mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      content: 'HTML is Easy',
      date: new Date(),
      important: true,
    })

    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
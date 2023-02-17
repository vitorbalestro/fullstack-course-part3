const mongoose = require('mongoose')

if(process.argv.length< 3){
    console.log('give password as argument')
    exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vitorbalestro:${password}@cluster0.rqewpdy.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

/*Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})*/

if(process.argv.length < 4) {

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })

} else {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })

}
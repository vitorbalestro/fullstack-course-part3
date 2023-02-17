const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('build'))

app.use(express.json())

var morgan = require('morgan')

morgan.token('body', function getBody(req, res){ 
    var output = ''
    if(req.method === 'POST'){
        output = JSON.stringify(req.body)
    }
    return output
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const cors = require('cors')
app.use(cors())



app.get('/api/persons', (request,response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request,response) => {
    Person.find({}).then(persons => {
        response.send(`<h1>The phonebook has ${persons.length} persons</h1>`)
    })
})

app.get('/api/persons/:id', (request,response,next) => {
    Person.findById(request.params.id).then((person) => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
   
})

app.delete('/api/persons/:id', (request,response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            console.log(result)
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    

    Person.findByIdAndUpdate(request.params.id, 
        { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request,response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.log(error)

    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id '})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 
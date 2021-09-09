const express = require('express')
const app = express()

app.use(express.json())


let entries = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "Test 4 DELETE",
        "number": "1234567890"
    }
]


//Creates the GET request with all the phonebook entries
app.get('/api/persons', (request, response) => {
    if (request.body) {
        response.json(entries)
    } else {
        response.status(404).end()
    }
})

//Creates the GET request with info about the phonebook and the timestamp of the request
app.get('/info', (request, response) => {
    let timestamp = new Date();
    let numberOfEntries = entries.length;
    if (request.body) {
        response.send('The phonebook has info for ' + numberOfEntries + ' people. <br/>' + timestamp);
    } else {
        response.status(404).end();
    }
})

//Displays single entries based on their id if they are present, else returns 404
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const entry = entries.find(phoneEntry => phoneEntry.id == id)
    if (entry){
        response.json(entry);
    } else {
        response.status(404).end("This entry does not exist")
    }
    
})

//Deletes an entry filtering the entries array out of the id in the URI.
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    entries = entries.filter(entry => entry.id !== id)

    response.status(204).end()
})

//Add new entries
app.post('/api/persons', (request, response) => {
    
    //Returns error 400 if there is no name or number in the request body
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }

    //Uses the cunstom function checkName, which filters all the entries and returns a result
    //if a name is the same. If there is at least a result in the returned array, it means that the 
    //name is a duplicate and ends the request with status 400
    if (checkName(body.name).length > 0) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    //Creates a random ID and the entry
    const id = Math.floor(Math.random() * 99999)
    
    const entry = {
        'id': id,
        'name': body.name,
        'number': body.number
    }

    //Adds the entry to all other entries
    entries = entries.concat(entry)

    //Responds with the content of entry
    response.json(entry)
})

//checkName function
const checkName = (name) => entries.filter((entry) => entry.name == name)



//Defines the port of the server
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const app = express()
const pug = require('pug');
const fs = require('fs');
const { request, response } = require('express');
const port = 3000

const BOOKS = [

]

const readBook = function(fileName) {
    // Make this async
    const rawData = fs.readFileSync(fileName)
    const jsonBook = JSON.parse(rawData)
    // Verify book json
    BOOKS.push(jsonBook)
}

const startup = function() {
    readBook('books/Short-Tomb.json')
    console.log(`Example app listening on port ${port}`)
}

app.get('/books/:bookName', (request, response) => {
    response.send(request.params)
})

app.get('/books/:bookName/:pageName', (request, response) => {
    const book = request.params.bookName
    const pageName = request.params.pageName
    const html = pug.renderFile('template/page.pug', BOOKS[0][pageName])
    response.send(html)
})

app.get('/', (request, response) => {
    // Add some book choosing mechanism
    response.redirect(307, '/books/Short-Tomb')
    
})

app.listen(port, startup)

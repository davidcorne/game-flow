const express = require('express')
const app = express()
const path = require('path')
const pug = require('pug');
const fs = require('fs');
const { request, response } = require('express');
const port = 3000

const BOOKS = {}

const readBook = function(fileName) {
    // Make this async
    const rawData = fs.readFileSync(fileName)
    const jsonBook = JSON.parse(rawData)
    // Verify book json
    const bookPath = path.basename(fileName, path.extname(fileName))
    BOOKS[bookPath] = jsonBook
}

const startup = function() {
    readBook('books/Short-Tomb.json')
    console.log(`Example app listening on port ${port}`)
}

const getStartPage = function(book) {
    return '1'
}

const error = function(message, response) {
    response.send(`ERROR: $(message)`)
}

const displayPage = function(bookPath, pageName, response) {
    if (!bookPath in BOOKS) {
        error(`Didn't find $(bookPath)`, response)
        return
    } 
    const book = BOOKS[bookPath]
    if (!pageName in book.pages) {
        error(`Didn't find $(pageName)`, response)
    }
    const page = book.pages[pageName]
    const locals = {
        bookPath: bookPath, 
        bookName: book.bookName,
        ...page
    }
    const html = pug.renderFile('template/page.pug', locals)
        response.send(html)
}

app.get('/books/:bookPath', (request, response) => {
    const bookPath = request.params.bookPath
    if (!bookPath in BOOKS) {
        error(`Didn't find $(bookPath)`, response)
    }
    const pageName = getStartPage(bookPath)
    displayPage(bookPath, pageName, response)
})

app.get('/books/:bookPath/:pageName', (request, response) => {
    const bookPath = request.params.bookPath
    const pageName = request.params.pageName
    displayPage(bookPath, pageName, response)
})

app.get('/', (request, response) => {
    // Add some book choosing mechanism
    response.redirect(307, '/books/Short-Tomb')
    
})

app.listen(port, startup)

const express = require('express')
const app = express()
const pug = require('pug');
const port = 3000

app.get('/', (req, res) => {
    const html = pug.renderFile('template/home.pug', {});
    res.send(html)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

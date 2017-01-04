
const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.get('/', (req, res) => {
    res.send('page preved')
})

app.listen(port, () => {
    console.log('started listening on %d', port)
})
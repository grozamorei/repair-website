
const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.use(express.static('static'))

app.listen(port, () => {
    console.log('started listening on %d', port)
})
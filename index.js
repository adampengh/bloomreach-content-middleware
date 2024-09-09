const express = require('express')
const app = express()
const port = 3000

app.use('/api', require('./routes/api'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
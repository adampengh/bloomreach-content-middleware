const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const response = {
    endpoints: {
      v1: '/v1',
      v2: '/v2'
    }
  }
  res.send(response)
})

router.use('/v1', require('./v1'))

module.exports = router
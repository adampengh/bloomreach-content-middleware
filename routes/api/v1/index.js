const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const response = {
    endpoints: {
      pages: '/{environment}/{channel}/pages',
      documents: '/{environment}/{channel}/documents'
    }
  }
  res.send(response)
})

router.get('/:environment/', async (req, res) => {
    res.send({
      environment: req.params.environment
    })
  })

router.get('/:environment/:channel', async (req, res) => {
  res.send({
    environment: req.params.environment,
    channel: req.params.channel,
  })
})

router.use('/:environment/:channel/pages', require('./pages'))

module.exports = router
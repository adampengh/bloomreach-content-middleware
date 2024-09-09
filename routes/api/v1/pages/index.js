const express = require('express')
const expressCache = require("cache-express");
const router = express.Router({ mergeParams: true })

router.get(
  '/*',
  expressCache({
    dependsOn: () => ['preview-token'],
    timeOut: 1000 * 10, // cache for 1 minute
    onTimeout: () => console.log('Cache removed')
  }),
  async (req, res) => {
    const { environment, channel } = req.params
    let path = req.params[0]
    path = path ? `/${path}` : '/'

    let { 'preview-token': previewToken } = req.query
    previewToken = previewToken ? `?preview-token=${previewToken}` : ''

    const response = await fetch(`https://${environment}.bloomreach.io/delivery/site/v1/channels/${channel}/pages${path}${previewToken}`)
      .then(response => response.json())
      .then(data => {
        return { status: 200, body: data}
      })
      .catch(error => {
        console.error('error', error.status)
        return { status: 404, body: { status: 404, error: 'Not Found' }}
      })

    res.send(response.body)
  }
)

module.exports = router
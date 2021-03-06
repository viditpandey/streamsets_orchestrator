const express = require('express')
var path = require('path')
const DEFAULT_PORT = 8081

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
// app.use(express.static(path.join(__dirname, 'dist'), { fallthrough: false }))

app.get('/backend_base_url', (req, res) => {
  res.status(200).json({ data: process.env.STREAMSETS_BACKEND_URL })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(process.env.PORT || DEFAULT_PORT, function () {
  console.log('streamsets orchestrator is running at', process.env.PORT || DEFAULT_PORT)
})

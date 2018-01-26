const spawn = require('child_process').spawn
const http = require('http')
const packageInfo = require('./package.json')

const clone = () => spawn('git', ['clone', process.env.GIT_REPO_URL, process.env.GIT_TARGET_PATH])

const handleRequest = (req, res) => {
  console.log(req.headers)
  try {
    clone()
  } catch (err) {
    console.error(err)
  }
  res.writeHead(200)
  res.end()
}

const listen = port => {
  http.createServer()
  .listen(port)
  .on('request', handleRequest)
  console.log(`${packageInfo.name} v${packageInfo.version} listening on port ${port}`)
}

listen(process.env.PORT || 3000)

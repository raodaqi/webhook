var http = require('http')
  , exec = require('exec')

const PORT = 3030
  , DEV_PATH = '/home/wwwroot/dev.xuexizhuye.com/xuexizhuye/'
  , MASTER_PATH = '/home/wwwroot/www.xuexizhuye.com/xuexizhuye/'

var deployServer = http.createServer(function(request, response) {
  if (request.url.search(/deploy_dev\/?$/i) > 0) {

    var commands = [
      'cd ' + DEV_PATH,
      'git pull'
    ].join(' && ')

    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      response.writeHead(200)
      response.end('Deploy Dev Done.')

    })

  } else if (request.url.search(/deploy_master\/?$/i) > 0) {

    var commands = [
      'cd ' + MASTER_PATH,
      'git pull'
    ].join(' && ')

    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      response.writeHead(200)
      response.end('Deploy Master Done.')

    })

  } else {

    response.writeHead(404)
    response.end('Not Found.')

  }
})

deployServer.listen(PORT)
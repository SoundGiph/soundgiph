const proxy = require('http-proxy-middleware')
module.exports = function(app){
    app.use(proxy('/all', {target: 'http://backend:3000'}))

}
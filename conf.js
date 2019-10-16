var conf = {},
    path = require('path')
conf.HOST                             = '176.122.147.10';
conf.PORT                             =  2222;
conf.paths                            = {};
conf.paths.app                        = path.join(__dirname, 'app');
conf.paths.routes                     = path.join(conf.paths.app, 'routes');
conf.routePrefix                      = '/test';

module.exports = conf;
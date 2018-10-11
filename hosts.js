const express = require('express'),
    httpProxy = require('http-proxy'),
    getHosts = require('./hosts/getHosts'),
    getConfig = require('./hosts/getConfig'),
    searchUrl = require('./hosts/searchUrl'),

    config = require('./config'),

    proxy = httpProxy.createProxyServer({}),
    app = express();

getConfig();

app.use((req, res) => {
    if (req.url === config.UPDATE_URL) {
        getConfig();
        return res.end("RedStar Systems host: Config updated success!");
    }

    let hosts = getHosts(req);
    let url = searchUrl(hosts);

    if (url === null){
        return res.end("RedStar Systems host: Error: 404, host not found!");
    }

    proxy.web(req, res, {
        target: url,
    });
});

app.listen(80, () => console.log("Host is started on port 80"));
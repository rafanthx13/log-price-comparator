const express = require('express');
var history = require('connect-history-api-fallback')
const path = require('path');
const serveStatic = require("serve-static")

app = express();

app.use(history({
    verbose: true
}))

app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);
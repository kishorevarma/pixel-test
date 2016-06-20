require('babel-register')();
var app = require('./server').default;
var PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server listening on', PORT);
});

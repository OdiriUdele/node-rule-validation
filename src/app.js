const express = require('express');
const {RuleDataExists}  = require('./middleware/Middleware');
const app = express();
const handleError = require('./error');

app.use(express.json())

// routes
app.post('/validate-rule',RuleDataExists);

app.use(require('./route/route'));

app.use((err,req, res, next) => {
    if(err) {
      error = handleError(err);
      res.status(400).json(error)
    }
});

app.listen(3000);

console.log('app running at 3000');
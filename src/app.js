const express = require('express');
const {RuleDataExists}  = require('./middleware/Middleware');
const app = express();
const handleError = require('./error');

app.use(express.json())

// routes
app.post('/validate-rule',RuleDataExists); //initial middleware to check if json value has the required fields

app.use(require('./route/route'));

app.use((err,req, res, next) => {//erroor handling
    if(err) {
      error = handleError(err);
      res.status(400).json(error)
    }
});

app.listen(3000);

console.log('app running at 3000');
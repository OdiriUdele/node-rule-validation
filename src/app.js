const express = require('express');//add express dependemcy 
const {RuleDataExists}  = require('./middleware/Middleware');//fetch middleware
const app = express();
const handleError = require('./error');
const Port = 3000;
app.use(express.json())

// routes
//app.post('/validate-rule',RuleDataExists); //initial middleware to check if json value has the required fields

app.use(require('./route/route'));

app.use((err,req, res, next) => {//erroor handling
    if(err) {
      error = handleError(err);//call handleError function
      res.status(400).json(error)
    }
    next();
});


app.listen(process.env.PORT || Port);
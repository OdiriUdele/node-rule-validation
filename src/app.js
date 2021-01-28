const express = require('express');
const {RuleDataExists}  = require('./middleware/Middleware');
const app = express();

app.use(express.json())

// routes
app.post('/validate-rule',RuleDataExists);

app.use(require('./route/route'));

app.listen(3000);
console.log('app running at 3000');
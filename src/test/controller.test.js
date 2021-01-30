const route = require('../route/route');
const {RuleDataExists}  = require('../middleware/Middleware');
const express = require('express');
const request = require('supertest');
var authController = require('../controller/Controller')

const mockRequest = (body) => ({
    body,
  });
  
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.body = jest.fn().mockReturnValue(res);
        return res;
    };

    const mockNext=jest.fn();
  
    const initApp = () => {
        const app = express();
        app.use(express.json());
        app.post('/validate-rule',RuleDataExists);
        app.use(route);
        return app;
    }

//test root route
describe('GET / route', () => {
    test('It should return user details', async () => {
        const app = initApp();
        const resp = await request(app).get('/');
        expect(resp.body.message).toBe(
            'My Rule-Validation API.'
        );
    });
});

//testing validate-rule route
describe('test POST /validate-rule route', () => {
    test("testing POST validate-rule if rule is successfully validated", async () => {
        const app = initApp();
        const res = await request(app)
          .post("/validate-rule")
          .set('Accept','application/json')
          .send({ 
                "rule": {
                    "field":"0",
                    "condition":"eq",
                    "condition_value": "n"
                },
                "data": "null"
            });
            expect(res.body).toHaveProperty('data.validation');
            expect(res.body.message).toContain('successfully validated.');
      });

      test("testing POST validate-rule if rule is successfully validated", async () => {
        const app = initApp();
        const res = await request(app)
          .post("/validate-rule")
          .set('Accept','application/json')
          .send({ 
                "rule": {
                    "field":"0",
                    "condition":"contains",
                    "condition_value": "e"
                },
                "data": ["null","ball"]
            });
            expect(res.body).toHaveProperty('data.validation');
            expect(res.body.message).toContain('failed validation.');
      });


      test("testing if rule.field nesting is greater than 2 levels", async () => {
        const app = initApp();
        const res = await request(app)
          .post("/validate-rule")
          .set('Accept','application/json')
          .send({ 
                "rule": {
                    "field":"age.sex.gender",
                    "condition":"gt",
                    "condition_value": "n"
                },
                "data": "null"
            });
            expect(res.body.message).toBe('Invalid Field Nesting.');
           
      });

      test("testing if field is of wrong type", async () => {
        const app = initApp();
        const res = await request(app)
          .post("/validate-rule")
          .set('Accept','application/json')
          .send({ 
                "rule": {
                    "field":"age.sex.gender",
                    "condition":"gt",
                    "condition_value": "n"
                },
                "data": 500
            });
            expect(res.body.message).toContain('must be ');
           
      });

      test("testing if rule.field is missing from data", async () => {
        const app = initApp();
        const res = await request(app)
          .post("/validate-rule")
          .set('Accept','application/json')
          .send({ 
                "rule": {
                    "field":"age.sex",
                    "condition":"gt",
                    "condition_value": "n"
                },
                "data": "500"
            });
            expect(res.body.message).toContain('is missing from data.');
           
      });
     
});

////////////////////////////////////////

 //test middleware
 describe('test POST /validate-rule middleware', () => {
    test('should return 400 if rule field is missing', async () => {
        const req = mockRequest({ });
        const res = mockResponse();
        await RuleDataExists(req, res, ()=>{});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "message": "\"rule\" is required.",
            "status": "error",
            "data": null
        });
    });

    test('should return 400 and error if rule field is number', async () => {
        const req = mockRequest({ 
            rule: 0
        });
        const res = mockResponse();
        await RuleDataExists(req, res, ()=>{});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "message": "\"rule\" must be of type object.",
            "status": "error",
            "data": null
        });
    });

    test('should return 400 if data field is missing', async () => {
        const req = mockRequest({ 
            rule: {
            "field":"0",
            "condition":"gt",
            "condition_value": "n"
        }});
        const res = mockResponse();
        await RuleDataExists(req, res, ()=>{});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "message": "\"data\" is required.",
            "status": "error",
            "data": null
        });
    });


    test('should return 200 if required fields inputed', async () => {
        const req = mockRequest({
            "rule": {
                "field":"0",
                "condition":"gt",
                "condition_value": "n"
            },
            "data": "null"
        });
        const next = mockNext;
        const res = mockResponse();
        await RuleDataExists(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(next).toHaveBeenCalled();
    });
});

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
    test("testing POST validate-rule route works", async () => {
        const app = initApp();
        const res = await request(app)
          .post("/validate-rule")
          .set('Accept','application/json')
          .send({ 
                "rule": {
                    "field":"0",
                    "condition":"gt",
                    "condition_value": "n"
                },
                "data": "null"
            });
            expect(res.body).toHaveProperty('data.validation');
           
      });
     
});

 //test middleware
 describe('test POST /validate-rule middleware', () => {
    test('should return 400 if required fields are missing', async () => {
        const req = mockRequest({});
        const res = mockResponse();
        await RuleDataExists(req, res, ()=>{});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "message": "\"rule\" is required.",
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

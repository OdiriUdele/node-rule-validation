

 
 <p align="center"> Node Rule Validation</p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## About Node Rule Validation

 Created Project using npm init.

Added Dependencies like:
- joi.
- nodemon.
- express
- jest
 -supertest


## Getting Started

    * Clone the repository 
    * npm install
## Example

Example JSON request payloads:<br>
= EX1 =
```json
{
  "rule": {
    "field": "missions.count",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      "Count": 45,
      "successful": 44,
      "failed": 1
    }
  }
}
```
Response: (HTTP 200)
```json
{
  "message": "field missions.count successfully validated.",
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions.count",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}
```
= EX2 =
```json
{
  "rule": {
    "field": "0",
    "condition": "eq",
    "condition_value": "a"
  },
  "data": "damien-marley"
}
```
Response: (HTTP 400)
```json
{
  "message": "field 0 failed validation.",
  "status": "error",
  "data": {
    "validation": {
      "error": true,
      "field": "0",
      "field_value": "d",
      "condition": "eq",
      "condition_value": "a"
    }
  }
}
```

= EX3 =
```json
{
  "rule": {
    "field": "5",
    "condition": "contains",
    "condition_value": "rocinante"
  },
  "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
}
```
Response: (HTTP 400)
```json
{
  "message": "field 5 is missing from data.",
  "status": "error",
  "data": null
}
```

## odiriudele@gmail.com


The Node Rule Validation is written by [Odiri Udele](odiriudele@gmail.com).

define({ "api": [
  {
    "type": "delete",
    "url": "/category/:id",
    "title": "Delete a specific category",
    "name": "DeleteCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id of the category you want to delete. this category must not to be defined in a sound</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nSuccess",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/categoryRouter.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/category/:id",
    "title": "Get a specific category",
    "name": "GetCategories",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>ObjectId of a category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "category",
            "description": "<p>a specific category in API</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"_id\": \"5bd70c6172c3a20016a55a2e\",\"name\": \"City\",\"description\": \"Town, only bigger!\",\"__v\": 0}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/categoryRouter.js",
    "groupTitle": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/category",
    "title": "Get all the categories",
    "name": "GetCategories",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of thecategory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "categories",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n{\"_id\": \"5bd70ac772c3a20016a55a1c\",\"name\": \"Airplanes\",\"description\": \"Yeah flying machines\",\"__v\": 0},\n{\"_id\": \"5bd70afe72c3a20016a55a1d\",\"name\": \"Cars\",\"description\": \"Yeah rolling machines\",\"__v\": 0},\n{\"_id\": \"5bd70c6172c3a20016a55a2e\",\"name\": \"City\",\"description\": \"Town, only bigger!\",\"__v\": 0}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/categoryRouter.js",
    "groupTitle": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/category/:id/sounds",
    "title": "Get all the sounds of a category",
    "name": "GetSoundsofCategory",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "get",
            "description": "<p>all the sounds of a category</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n[\n{\"categories\":[\"5bd6cf249903d62d18f7f03f\"],\"_id\":\"5bd6d3f6d806a2097ca18e4f\",\"sound\":\"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)\",\"coordinate\":{\"city\":\"Pully AB\",\"loc\":{\"x\":-74.974,\"y\":40.764}},\"description\":\"a sound recorded in Pully AB\",\"quality\":\"Bad\",\"user\":\"5bd6cdce77705b055c73569c\",\"__v\":0},\n{\"categories\":[\"5bd6cf249903d62d18f7f03f\"],\"_id\":\"5bd6d9908a4a2e3774a90fcf\",\"sound\":\"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)\",\"coordinate\":{\"city\":\"Pully A\",\"loc\":{\"x\":-74.974,\"y\":40.764}},\"description\":\"a sound recorded in Lausanne A\",\"quality\":\"Bad\",\"user\":\"5bd7cdce77705b055c73569c\",\"__v\":0}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/categoryRouter.js",
    "groupTitle": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/category",
    "title": "Add a new category",
    "name": "PostCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the new category</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the new category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "category",
            "description": "<p>a new category</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"_id\": \"5bd70c6172c3a20016a55a2e\",\"name\": \"City\",\"description\": \"Town, only bigger!\",\"__v\": 0}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/categoryRouter.js",
    "groupTitle": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/category/:id",
    "title": "Modify a specific category",
    "name": "PutCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id of the category you want to modify</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>new name of the category</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>new description of the category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "modifiy",
            "description": "<p>a specific category</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"_id\": \"5bd70c6172c3a20016a55a2e\",\"name\": \"City\",\"description\": \"Town, only bigger!\",\"__v\": 0}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/categoryRouter.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login a user",
    "name": "Log_in",
    "group": "Login",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>Email credentials of the user trying to login</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user trying to login</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "token[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>A json web token that must be sent with every request to identify the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    Content-Type: application/json; charset=utf-8\n\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDE0MDcxMTkuMzQ2LCJpYXQiOjE1NDA4MDIzMTkzNDZ9.-x2WD3X6hVU1g-l_7tXIeYPlLOaDAARJPAGPhZlQo6I\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>The email of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>The password of the User is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404:",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: application/json; charset=utf-8\n\n{\n     \"status\": 404,\n     \"message\": \"User Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "401:",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: application/json; charset=utf-8\n{\n     \"status\": 401,\n     \"message\": \"invalid password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/authRouter.js",
    "groupTitle": "Login"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register a user",
    "name": "Register",
    "group": "Login",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "name",
            "size": "3-20",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the new user</p>"
          },
          {
            "group": "Request body",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the new user</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the new user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "user",
            "description": "<p>The newly created user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"name\": \"Foo Bar\",\n  \"email\": \"test@example.com\",\n  \"registrationDate\": \"2018-10-29T09:16:28.095Z\",\n  \"id\": \"5bd6cfec05f26128d2edb264\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422",
            "description": "<p>Wrong request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422:",
          "content": "    HTTP/1.1 422 Unprocessable Entity\n    {\n    \"message\": \"users validation failed: email: Path `email` is required., name: Path `name` is required., password: Path `password` is required.\",\n    \"errors\": {\n        \"email\": {\n            \"message\": \"Path `email` is required.\",\n            \"name\": \"ValidatorError\",\n            \"properties\": {\n                \"message\": \"Path `email` is required.\",\n                \"type\": \"required\",\n                \"path\": \"email\"\n            },\n            \"kind\": \"required\",\n            \"path\": \"email\",\n            \"$isValidatorError\": true\n        },\n        \"name\": {\n            \"message\": \"Path `name` is required.\",\n            \"name\": \"ValidatorError\",\n            \"properties\": {\n                \"message\": \"Path `name` is required.\",\n                \"type\": \"required\",\n                \"path\": \"name\"\n            },\n            \"kind\": \"required\",\n            \"path\": \"name\",\n            \"$isValidatorError\": true\n        },\n        \"password\": {\n            \"message\": \"Path `password` is required.\",\n            \"name\": \"ValidatorError\",\n            \"properties\": {\n                \"message\": \"Path `password` is required.\",\n                \"type\": \"required\",\n                \"path\": \"password\"\n            },\n            \"kind\": \"required\",\n            \"path\": \"password\",\n            \"$isValidatorError\": true\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/authRouter.js",
    "groupTitle": "Login"
  },
  {
    "type": "delete",
    "url": "/sound/:id",
    "title": "Remove a sound",
    "name": "DELETE_SOUND",
    "group": "Sound",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Sound unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nSuccess",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/soundRouter.js",
    "groupTitle": "Sound"
  },
  {
    "type": "get",
    "url": "/sound?page=X&pageSize=Y",
    "title": "Get all Sounds",
    "name": "GET_ALL_SOUND",
    "group": "Sound",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Num of requested page</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page-size",
            "description": "<p>Number of element requested per page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "sounds",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n{\"categories\":[\"5bd6cf249903d62d18f7f03f\"],\"_id\":\"5bd6d3f6d806a2097ca18e4f\",\"sound\":\"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)\",\"coordinate\":{\"city\":\"Pully AB\",\"loc\":{\"x\":-74.974,\"y\":40.764}},\"description\":\"a sound recorded in Pully AB\",\"quality\":\"Bad\",\"user\":\"5bd6cdce77705b055c73569c\",\"__v\":0},\n{\"categories\":[\"5bd6cf249903d62d18f7f03f\"],\"_id\":\"5bd6d9908a4a2e3774a90fcf\",\"sound\":\"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)\",\"coordinate\":{\"city\":\"Pully A\",\"loc\":{\"x\":-74.974,\"y\":40.764}},\"description\":\"a sound recorded in Lausanne A\",\"quality\":\"Bad\",\"user\":\"5bd7cdce77705b055c73569c\",\"__v\":0}\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "Pagination-Page",
            "description": "<p>Num of the current page</p>"
          },
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "Pagination-PageSize",
            "description": "<p>Number of element per page</p>"
          },
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "Pagination-Total",
            "description": "<p>Total number of element in database</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Pagination Header Example:",
          "content": "Pagination-Page → 1\nPagination-PageSize → 5\nPagination-Total → 10",
          "type": "string"
        },
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/soundRouter.js",
    "groupTitle": "Sound"
  },
  {
    "type": "get",
    "url": "/sound/:id",
    "title": "Get a sound by its id",
    "name": "GET_A_SOUND",
    "group": "Sound",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>ObjectId of sound in API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sound",
            "description": "<p>a Sound object in API</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"categories\":[\"5bd6cf249903d62d18f7f03f\"],\"_id\":\"5bd6d3f6d806a2097ca18e4f\",\"sound\":\"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)\",\"coordinate\":{\"city\":\"Pully AB\",\"loc\":{\"x\":-74.974,\"y\":40.764}},\"description\":\"a sound recorded in Pully AB\",\"quality\":\"Bad\",\"user\":\"5bd6cdce77705b055c73569c\",\"__v\":0}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/soundRouter.js",
    "groupTitle": "Sound",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/city/stats/",
    "title": "Get the number of sounds recorded by city",
    "name": "GET_NUMBER_SOUNDS_BY_CITY",
    "group": "Sound",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "cities",
            "description": "<p>An array containing all cities registered in the API with the numbe of sounds recorded in it</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n[{\"_id\":\"Vevey\",\"nbrSound\":4},{\"_id\":\"Lausanne\",\"nbrSound\":1},{\"_id\":\"Sion\",\"nbrSound\":5}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/soundRouter.js",
    "groupTitle": "Sound",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/sound/city/:name",
    "title": "Get all sounds recorded in a city",
    "name": "GET_SOUNDS_BY_CITY",
    "group": "Sound",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>name of the city</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "sounds",
            "description": "<p>An array containing all the sounds of a city</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n[{\"categories\":[\"5bd6cf249903d62d18f7f03f\"],\"_id\":\"5bd6d3f6d806a2097ca18e4f\",\"sound\":\"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)\",\"coordinate\":{\"city\":\"Pully AB\",\"loc\":{\"x\":-74.974,\"y\":40.764}},\"description\":\"a sound recorded in Pully AB\",\"quality\":\"Bad\",\"user\":\"5bd6cdce77705b055c73569c\",\"__v\":0}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/soundRouter.js",
    "groupTitle": "Sound",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/sound/city/",
    "title": "Get all sounds grouped by city",
    "name": "GET_SOUNDS_GROUPED_BY_CITY",
    "group": "Sound",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "cities",
            "description": "<p>An array containing all cities registered in the API</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n[\"Lausanne\",\"Vevey\",\"Sion\"]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/soundRouter.js",
    "groupTitle": "Sound",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/sound/",
    "title": "Save a new sound",
    "name": "POST_SOUND",
    "group": "Sound",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sound",
            "description": "<p>Sound file exported in base64</p>"
          },
          {
            "group": "Request body",
            "type": "ObjectId[]",
            "optional": false,
            "field": "categories",
            "description": "<p>list of category Ids belonging to the sound</p>"
          },
          {
            "group": "Request body",
            "type": "CoordinateSchema",
            "optional": false,
            "field": "coordinate",
            "description": "<p>a coordinate which must have this format {&quot;city&quot;:&quot;Name of the city&quot;,&quot;loc&quot;:{&quot;x&quot;:LatitudeDegree,&quot;y&quot;:LongitudeDegree}}</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of a sound</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "quality",
            "description": "<p>A string which can be &quot;Bad&quot; or &quot;Good&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sound",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"categories\":[\"5bd6cf249903d62d18f7f03f\"],\"_id\":\"5bd6d3f6d806a2097ca18e4f\",\"sound\":\"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)\",\"coordinate\":{\"city\":\"Pully AB\",\"loc\":{\"x\":-74.974,\"y\":40.764}},\"description\":\"a sound recorded in Pully AB\",\"quality\":\"Bad\",\"user\":\"5bd6cdce77705b055c73569c\",\"__v\":0}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/soundRouter.js",
    "groupTitle": "Sound"
  },
  {
    "type": "put",
    "url": "/sound/:id",
    "title": "Update a sound",
    "name": "PUT_SOUND",
    "group": "Sound",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Sound unique ID.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sound",
            "description": "<p>Sound file exported in base64</p>"
          },
          {
            "group": "Request body",
            "type": "ObjectId[]",
            "optional": false,
            "field": "categories",
            "description": "<p>list of category Ids belonging to the sound</p>"
          },
          {
            "group": "Request body",
            "type": "CoordinateSchema",
            "optional": false,
            "field": "coordinate",
            "description": "<p>a coordinate which must have this format {&quot;city&quot;:&quot;Name of the city&quot;,&quot;loc&quot;:{&quot;x&quot;:LatitudeDegree,&quot;y&quot;:LongitudeDegree}}</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of a sound</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "quality",
            "description": "<p>A string which can be &quot;Bad&quot; or &quot;Good&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sound",
            "description": "<p>return the modified sound</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"categories\":[\"5bd6cf249903d62d18f7f03f\"],\"_id\":\"5bd6d3f6d806a2097ca18e4f\",\"sound\":\"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)\",\"coordinate\":{\"city\":\"Pully AB\",\"loc\":{x\":-74.974,\"y\":40.764}},\"description\":\"a sound recorded in Pully AB\",\"quality\":\"Bad\",\"user\":\"5bd6cdce77705b055c73569c\",\"__v\":0}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/soundRouter.js",
    "groupTitle": "Sound"
  },
  {
    "type": "post",
    "url": "/api/user",
    "title": "Create a User",
    "name": "CreateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "name",
            "size": "3-20",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the new user</p>"
          },
          {
            "group": "Request body",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the new user</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the new user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "user",
            "description": "<p>The newly created user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"name\": \"Foo Bar\",\n  \"email\": \"test@example.com\",\n  \"registrationDate\": \"2018-10-29T09:16:28.095Z\",\n  \"id\": \"5bd6cfec05f26128d2edb264\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422",
            "description": "<p>Wrong request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422:",
          "content": "    HTTP/1.1 422 Unprocessable Entity\n    {\n    \"message\": \"users validation failed: email: Path `email` is required., name: Path `name` is required., password: Path `password` is required.\",\n    \"errors\": {\n        \"email\": {\n            \"message\": \"Path `email` is required.\",\n            \"name\": \"ValidatorError\",\n            \"properties\": {\n                \"message\": \"Path `email` is required.\",\n                \"type\": \"required\",\n                \"path\": \"email\"\n            },\n            \"kind\": \"required\",\n            \"path\": \"email\",\n            \"$isValidatorError\": true\n        },\n        \"name\": {\n            \"message\": \"Path `name` is required.\",\n            \"name\": \"ValidatorError\",\n            \"properties\": {\n                \"message\": \"Path `name` is required.\",\n                \"type\": \"required\",\n                \"path\": \"name\"\n            },\n            \"kind\": \"required\",\n            \"path\": \"name\",\n            \"$isValidatorError\": true\n        },\n        \"password\": {\n            \"message\": \"Path `password` is required.\",\n            \"name\": \"ValidatorError\",\n            \"properties\": {\n                \"message\": \"Path `password` is required.\",\n                \"type\": \"required\",\n                \"path\": \"password\"\n            },\n            \"kind\": \"required\",\n            \"path\": \"password\",\n            \"$isValidatorError\": true\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/userRouter.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/user/:id",
    "title": "Delete a User",
    "name": "DeleteUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "user",
            "description": "<p>Confirmation of deletion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"message\": \"User with 5bc45fb518805a3b4711485f successfully deleted\"\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/userRouter.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/user",
    "title": "Get all users",
    "name": "GetUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "user",
            "description": "<p>An array containing all registered users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n[\n {\n      \"name\": \"Foo Bar\",\n      \"email\": \"test@example.com\",\n     \"registrationDate\": \"2018-10-29T09:16:28.095Z\",\n     \"id\": \"5bd6cfec05f26128d2edb264\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/userRouter.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Get User by Id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>a user ID</p>"
          }
        ]
      }
    },
    "name": "GetUserById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "user",
            "description": "<p>One user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n {\n     \"name\": \"Foo Bar\",\n     \"email\": \"test@example.com\",\n     \"registrationDate\": \"2018-10-29T09:16:28.095Z\",\n     \"id\": \"5bd6cfec05f26128d2edb264\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/userRouter.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/user/:id",
    "title": "Modify a User",
    "name": "PutUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "user",
            "description": "<p>An array containing the modified user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n\n {\n      \"name\": \"Foo Bar\",\n      \"email\": \"test@example.com\",\n     \"registrationDate\": \"2018-10-29T09:16:28.095Z\",\n     \"id\": \"5bd6cfec05f26128d2edb264\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/userRouter.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's Json Web Token .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4",
          "type": "string"
        }
      ]
    }
  }
] });

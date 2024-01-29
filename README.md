# JIE_Node_V2

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8085](http://localhost:8085) to view it in your browser.

### `npm run start`

## 📂 FOLDER STRUCTURE

Folder structure is based on productivity and some personal preferences:
```text
.
│   README.md
│   package.json  
|   server.js       * Entry point of the application.
│   ...   
│
└─── app
│   │   app.js // 5. Framework and Drivers
│   └─── config
│   │   |   index.js 
│   │   |   mongoose.js 
│   │   |   sequelize.js 
│   │   │   ...
│   │
│   └─── models // 1.a) entities (i.e., Mongoose, Sequelize models)
│   │   └─── mongoose
│   │   │   │   index.js
│   │   │   |   user.model.js
│   │   │   |   ...
│   │   └─── sequelize
│   │   │   │   index.js
│   │   │   |   user.model.js
│   │   │   |   ...
│   │   │   ...
│   │
│   └─── data_access // 1.b) entities (i.e., abstraction of Mongoose, Sequelize models)
│   │   │   index.js
│   │   │   user.db.js
│   │   │   ...
│   │
│   └─── use_cases // 2) Use cases
│   │   └─── users
│   │   │   │   index.js
│   │   │   │   update-user.js
│   │   │   │   ...
│   │   └─── ...
│   │
│   └─── controllers // 3) Interface Adapters
│   │   │   user.controller.js
│   │   │   ...
│   │
│   └─── routes // 4) Routes
│   │   └─── protected
│   │   │   │   index.js
│   │   │   |   user.route.js
│   │   │   |   ...
│   │   └─── public
│   │   │   │   index.js
│   │   │   |   auth.route.js
│   │   │   index.js
│   │   │   express-callback.js
│   │   │   ...
│   │
│   └─── middlewares // 4.b)
│   │   │   index.js
│   │   │   checkAuth.middleware.js
│   │   │   ...
│   │
│   └─── utils
│   │   └─── helpers
│   │   │   |   ...
│   │   └─── services
│   │   │   |   JWT.service.js
│   │   │   |   ...
│   │   │   ...
│   │
│   └─── validators
│   │   │   ...
│   
└─── ...
```
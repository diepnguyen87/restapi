const express = require('express')
const app = express()
const pieRepo = require('./repo/pieRepo')
const { logErrorsToConsole, clientErrorHandler, errorHandler, logErrorToFile } = require('./helpers/errorHelpers')
const { assertObjectType } = require('graphql')
const logRepo = require('./repo/logRepo')
const CORS = require('cors')

const router = express.Router()

app.use(express.json())
app.use(CORS())

router.get('/', (req, res, next) => {
  pieRepo.get(function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "Retrieve all data success",
      "data": data
    })
  }, function (err) {
    next(err)
  })
})

router.get('/search', (req, res, next) => {
  let searchObject = {
    "id": req.query.id,
    "name": req.query.name
  }

  pieRepo.search(searchObject, function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "All pie retrieved",
      "data": data
    })
  }, function (err) {
    next(err)
  })
})

router.get('/:id', (req, res, next) => {
  pieRepo.getByID(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Single pie retrieved",
        "data": data
      })
    } else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The pie " + req.params.id + " could not found",
        "error": {
          "code": "NOT_FOUND",
          "message": "The pie " + req.params.id + " could not found"
        }
      })
    }
  }, function (err) {
    next(err)
  })
})

router.post('/', (req, res, next) => {
  pieRepo.insertPie(req.body, function (data) {
    res.status(201).json({
      "status": 201,
      "statusText": "Created",
      "message": "Insert new success",
      "data": data
    })
  }, function (err) {
    next(err)
  })
})

router.put('/:id', (req, res, next) => {
  pieRepo.getByID(req.params.id, function (data) {
    if (data) {
      pieRepo.updatePie(req.body, req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "Updated",
          "message": "Update " + req.params.id + " success",
          "data": data
        })
      })
    } else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The pie " + req.params.id + " could not found",
        "error": {
          "code": "NOT_FOUND",
          "message": "The pie " + req.params.id + " could not found"
        }
      })
    }
  }, function (err) {
    next(err)
  })
})

router.delete('/:id', (req, res, next) => {
  pieRepo.getByID(req.params.id, function (data) {
    if (data) {
      pieRepo.deletePie(req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "Deleted",
          "message": "Delete pieID " + req.params.id + " success",
          "data": data
        })
      })
    } else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The pie " + req.params.id + " could not found",
        "error": {
          "code": "NOT_FOUND",
          "message": "The pie " + req.params.id + " could not found"
        }
      })
    }
  }, function (err) {
    next(err)
  })
})

router.patch('/:id', (req, res, next) => {
  pieRepo.getByID(req.params.id, function (data) {
    if (data) {
      pieRepo.updatePie(req.body, req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "Updated",
          "message": "Update " + req.params.id + " success",
          "data": data
        })
      })
    } else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The pie " + req.params.id + " could not found",
        "error": {
          "code": "NOT_FOUND",
          "message": "The pie " + req.params.id + " could not found"
        }
      })
    }
  }, function (err) {
    next(err)
  })
})

app.use('/api/', router)

app.use(logErrorsToConsole)
app.use(logErrorToFile)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(5000, () => {
  console.log("Node server is running on http://localhost:5000");
})
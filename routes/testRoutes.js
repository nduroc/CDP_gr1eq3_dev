const express = require('express')
const router = express.Router()

const testController = require('../controllers/testController')
const projectController = require('../controllers/projectController')
const logController = require('../controllers/logController')

const baseURL = '/projects/:projectID'

router.get(baseURL + '/tests', function (req, res) {
  testController.getAllTests(req.params.projectID)
    .then(tests => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/tests', {
            tests: tests,
            project: project,
            user: logController.userConnected
          })
        })
    })
})

router.get(baseURL + '/tests/create', function (req, res) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      res.render('../views/createTest', {
        project: project,
        user: logController.userConnected
      })
    })
})

router.get(baseURL + '/tests/:id', function (req, res) {
  testController.getTest(req.params.id)
    .then(test => {
      console.log(test._name)
    })
})

router.get(baseURL + '/tests/:id/update', function (req, res) {
  testController.getTest(req.params.id)
    .then(test => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          console.log(project._name)
          res.render('../views/updateTest', {
            test: test,
            project: project,
            user: logController.userConnected
          })
        })
    })
})

router.post(baseURL + '/tests/create', function (req, res) {
  testController.createTest(req, res)
  res.redirect('/projects/' + req.params.projectID + '/tests')
})

router.post(baseURL + '/tests/:id/update', function (req, res) {
  testController.updateTest(req, res)
  res.redirect('/projects/' + req.params.projectID + '/tests')
})

router.post(baseURL + '/tests/:id/delete', function (req, res) {
  testController.deleteTest(req, res)
  res.redirect('/projects/' + req.params.projectID + '/tests')
})

module.exports = router

const router = require('express').Router()
const async = require('async'),
  {User, Event} = require('../models'),
  config = require('../config'),
  co = require('bluebird').coroutine

router.get('/events/:username', co(function *(req, res) {
  let user = yield User.findOne({'profile.name': req.params.username})
  let events = yield Event.find({user: user._id})
  res.send({events})
}))

router.post('/event', function (req,res){
  let data = req.body
  data.user = req.user._id

  let event = new Event(data)
  event.save(function(err, saved){
    saved.populate('user', function(err, populated){
      res.send({event: populated})
    })
  })
})

router.post('/event/:event_id', function *(req,res){

})

module.exports = router

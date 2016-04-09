const
  router = require('express').Router(),
  async = require('async'),
  multer = require('multer'),
  path = require('path'),
  upload = multer({ dest: path.join(__dirname, '../uploads') }),
  qs = require('qs'),
  marked = require('marked'),
  models = require('../models'),
  User =  models.User,
  Post = models.Post,
  File = models.File,
  Project = models.Project
    if(post) return res.render('admin/post', {post} )
      post._author = user_id
        _author: user_id


//PROJECT SECTION


// list projects
router.get('/projects', function(req,res){
  Project.find(function(err, projects){
    res.render('admin/projects',{
      projects
    })
  })
})


// new projects
router.get('/project', function(req, res){
  const project = {}
  res.render('admin/project', {project} )
})

// view/edit projects
router.get('/project/:id', function(req,res){
  var id = req.params.id;
  Project.findOne({_id: id}, function(err, project){
    res.render('admin/project', {
      project
    })
  })
})

// add new/edit
router.post('/project', function(req, res){
  var id = req.body._id
  var body = req.body;

  Project.findOne({_id: id}, function(err, project){
    if(project){
      project.name=body.name;
      project.tag_line=body.tag_line;
      project.description=body.description;
      project.logo_url=body.logo_url;
      project.project_url=body.project_url
      project.save(function(err, saved){
        res.redirect('/admin/projects')
      })
    } else{
      var project = new Project({
        name: body.name,
        tag_line: body.tag_line,
        description: body.description,
        logo_url: body.logo_url,
        project_url: body.project_url
      })

      project.save(function(err, saved) {
        res.redirect('/admin/projects')
      })
    }
  })
})
// update
router.post('/project/:id', function(req, res){
  var id = req.params.id;
  var body = req.body;

  Project.findOne({_id: id}, function(err, project){
    project.name=body.name;
    project.tag_line=body.tag_line;
    project.description=body.description;
    project.logo_url=body.logo_url;
    project.project_url=body.project_url;
    project.save(function(err, saved){
      res.redirect('/admin/projects')
    })
  })
})

router.get('/project/delete/:id', function(req, res){
  Project.remove({_id: req.params.id}, function(err){
    if(err){
      req.flash('error', {msg: err.message} )
    }else{
      req.flash('success', {msg: 'deleted'} )
    }
    return res.redirect('/admin/projects')
  })
})


router.post('/images/upload', upload.array('file', 20), function(req,res){
  async.mapSeries( req.files, function(file, next){
    file = new File(file)
    file.save( next )
  }, function done(err, results){
    const file_names = results.map( file => file.originalname ).join('<br/>')
    res.send(`files uploaded<br/> ${file_names}`)
  })
})


// file model

//display listings of files
router.get('/files', function(req,res){
  File.find(function(err, files){
    res.render('admin/files',{
      files
    })
  })
})

//ADD new file model
router.get('/file', function(req, res){
  const file = {}
  res.render('admin/file', {file} )
})

//view/edit file model
router.get('/file/:id', function(req,res){
  var id = req.params.id;

  File.findOne({_id: id}, function(err, file){
    res.render('admin/file', {
      file
    })
  })
})

// add new/edit file model
router.post('/file', function(req, res){
  var id = req.body._id
  var body = req.body;

  File.findOne({_id: id}, function(err, file){
    if(file){
      file.originalname=body.originalname;
      file.encoding=body.encoding;
      file.mimetype=body.mimetype;
      file.destination=body.destination;
      file.filename=body.filename;
      file.path=body.path;
      file.size=body.size;
      file.save(function(err, saved){
        res.redirect('/admin/files')
      })
    } else{
      var file = new File({
        originalname: body.originalname,
        encoding: body.encoding,
        mimetype: body.mimetype,
        destination: body.destination,
        filename: body.filename,
        path: body.path,
        size: body.size
      })
      file.save(function(err, saved) {
        res.redirect('/admin/files')
      })
    }
  })
})

// update file model
router.post('/file/:id', function(req, res){
  var id = req.params.id;
  var body = req.body;
  File.findOne({_id: id}, function(err, file){
    file.original_name=body.original_name;
    file.encoding=body.encoding;
    file.mimetype=body.mimetype;
    file.destination=body.destination;
    file.filename=body.filename;
    file.path=body.path;
    file.size=body.size;
    file.save(function(err, saved){
      res.redirect('/admin/files')
    })
  })
})

// remove file model
router.get('/file/delete/:id', function(req, res){
  File.remove({_id: req.params.id}, function(err){
    if(err){
      req.flash('error', {msg: err.message} )
    }else{
      req.flash('success', {msg: 'deleted'} )
    }
    return res.redirect('/admin/files')
  })
})

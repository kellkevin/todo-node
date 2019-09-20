var express = require("express"),
	router = express.Router(),
	db = require("../models"),
	helpers = require("../helpers/todos");


router.route('/')
	.get(helpers.getTodos)
	.post(helpers.createTodo)
	
router.route('/:done')
	.get(helpers.getDoneTodos)

router.route('/:todoId')	
	.put(helpers.updateTodo)
	.delete(helpers.deleteTodo)
	.get(helpers.getTodo);

/*
router.get('/', function(req, res){
	db.Todo.find()
	.then(function(newTodo){
		res.json(newTodo);
	}).catch(function(err){
		res.send(err);
	})
});

router.post('/', function(req,res){
	db.Todo.create(req.body)
	.then(function(newTodo){
		res.status(201).res.json(newTodo);
	}).catch(function(err){
		res.send(err);
	});
});


router.get('/:todoId', function(req,res){
	db.Todo.findById(req.params.todoId)
	.then(function(foundTodo){
		res.json(foundTodo);
	}).catch(function(err){
		res.send(err);
	});
});


router.put('/:todoId', function(req,res){
	db.Todo.findOneAndUpdate({ _id: req.params.todoId}, req.body, {new: true})
	.then(function(todo){
		res.json(todo);
	}).catch(function(err){
		res.send(err);
	});
});

router.delete('/:todoId', function(req,res){
	
	db.Todo.remove({_id: req.params.todoId})
	.then(function(){
		res.json({message: "deleted!"});
	}).catch(function(err){
		res.send(err);
	});
});
*/
module.exports = router;
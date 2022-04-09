var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const todos = [{ id: 1, name: 'Watch RRR', done: true }]
/* GET todos listing. */
router.get('/', function (req, res, next) {
    res.json(todos);
});


/* GET todo by ID listing. */
router.get('/:id', function (req, res, next) {
    const result = todos.find(todo => todo.id === Number(req.params.id));

    if (!result) {
        return next(createError(404, "Todo Not Found!"))
    }
    res.json(result);
});

/* POST todos */
router.post('/', function (req, res, next) {
    const { body } = req;

    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        done: false
    }

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

/* PUT todo by ID listing. */
router.put('/:id', function (req, res, next) {
    const result = todos.find(todo => todo.id === Number(req.params.id));

    if (!result) {
        return next(createError(404, "Todo Not Found!"))
    }
    todos.pop(result);
    const { body } = req;

    const newTodo = {
        id: body.id,
        name: body.name,
        done: body.done
    }
    todos.push(newTodo);
    res.json(newTodo);
});

/* Delete todo by ID listing. */
router.delete('/:id', function (req, res, next) {
    const result = todos.find(todo => todo.id === Number(req.params.id));
    if (!result) {
        return next(createError(404, "Todo Not Found!"))
    }
    todos.pop(result);
    res.sendStatus(204);
});

module.exports = router;

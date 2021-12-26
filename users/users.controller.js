
const express = require('express');
const {v4: uuidv4}=require('uuid')

const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const auth = require('_middleware/auth')
const userService = require('./user.service');
const Role = require('_middleware/role');



// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize('getall'), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize('getID'), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize('deleteid'), _delete);
router.post('/role', roleSchema, role);
router.post('/device', deviceSchema, device);


module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        
        userame: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        role: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}
function roleSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().required(),
        getall: Joi.string().required(),
        updateall: Joi.string().required(),
        deleteall: Joi.string().required(),
        getbyid: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function role(req, res, next) {
    userService.createrole(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}
function deviceSchema(req, res, next) {
    const newid=uuidv4()
    const schema = Joi.object({
        email: Joi.string().required(),
        licensekey:uuidv4(),
        deviceid: Joi.string().required(),
        active: Joi.string().required(),
       
    });
    validateRequest(req, next, schema);
}

function device(req, res, next) {
    userService.createkey(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}


   
   
    
    
  
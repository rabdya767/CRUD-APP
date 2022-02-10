const express = require('express')

const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/controller')
    //rounters
    /**
     * @description Root Route
     * @method GET /index
     */
route.get('/', services.homeRoutes);

/**
 * @description AddUser Route
 * @method GET //add_user
 */
route.get('/add_user', services.add_user)

/**
 * @description Update User Route
 * @method GET /update_user
 */
route.get('/update_user', services.update_user)


//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;
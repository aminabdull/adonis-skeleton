/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('measurements', 'MeasurementsController.store')
  Route.get('measurements', 'MeasurementsController.index')
  Route.get('measurements/:id', 'MeasurementsController.show')
  Route.put('measurements/:id', 'MeasurementsController.update')
  Route.delete('measurements/:id', 'MeasurementsController.destroy')
})

Route.group(() => {
  Route.post('states', 'StatesController.store')
  Route.get('states', 'StatesController.index')
  Route.get('states/:id', 'StatesController.show')
  Route.put('states/:id', 'StatesController.update')
  Route.delete('states/:id', 'StatesController.destroy')
})

Route.group(() => {
  Route.post('types', 'TypesController.store')
  Route.get('types', 'TypesController.index')
  Route.get('types/:id', 'TypesController.show')
  Route.put('types/:id', 'TypesController.update')
  Route.delete('types/:id', 'TypesController.destroy')
})

Route.group(() => {
  Route.post('ingredients', 'IngredientsController.store')
  Route.get('ingredients', 'IngredientsController.index')
  Route.get('ingredients/:id', 'IngredientsController.show')
  Route.put('ingredients/:id', 'IngredientsController.update')
  Route.put('ingredients/types/:id', 'IngredientsController.assigntype')
  Route.put('ingredients/states/:id', 'IngredientsController.assignstate')
  Route.delete('ingredients/:id', 'IngredientsController.destroy')
})

Route.group(() => {
  Route.post('inflows', 'InflowsController.store')
  Route.get('inflows', 'InflowsController.index')
  Route.get('reason', 'InflowsController.reason')
  Route.get('inflows/:id', 'InflowsController.show')
  Route.put('inflows/:id', 'InflowsController.update')
  Route.delete('inflows/:id', 'InflowsController.destroy')
})




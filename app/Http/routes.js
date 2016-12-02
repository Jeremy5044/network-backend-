'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/users', 'UserController.register')
Route.post('/login', 'UserController.login')
Route.get('/users/','UserController.index')
Route.get('/users/:id/','UserController.show')
Route.get('/users/location','UserController.all').middleware('auth')
Route.delete('/user/:id', 'UserController.delete')
Route.get('/users/nearby', 'UserController.nearby').middleware('auth')


Route.post('/location','LocationController.post').middleware('auth')
Route.get('/users/:id/location','LocationController.grab')






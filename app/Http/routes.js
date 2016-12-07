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
Route.get('/users/:id','UserController.show')
Route.get('/users/location','UserController.all').middleware('auth')
Route.delete('/user/:id', 'UserController.delete')


Route.post('/location','LocationController.post').middleware('auth')
Route.get('/nearby', 'LocationController.nearby').middleware('auth')
Route.get('/users/:id/location','LocationController.grab')


// Route.get('/linkedin/login','LoginController.redirect')
// Route.get('/linkedin/authenticated','LoginController.callback')

Route.get('/threads','MessageController.index').middleware('auth')
Route.get('/messages/:friend_id','MessageController.show').middleware('auth')
Route.post('/messages','MessageController.post').middleware('auth')






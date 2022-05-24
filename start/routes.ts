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

Route.group(() => {
  /* eu passso o nome da rota que é /moments, depois, o controller dela, e . função */
  /*  Route.post('/moments', 'MomentsController.store') */
  /* Com resource ele cria todas as rotas basicas de uma aplicação */
  Route.resource('/moments', 'MomentsController').apiOnly()
  Route.resource('/moments/:momentId/comments', 'CommentsController').apiOnly()
}).prefix('/api')

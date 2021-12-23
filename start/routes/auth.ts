import Route from '@ioc:Adonis/Core/Route'

// Route.resource('/auth', 'Auth/Main')
//   .only(['store', 'destroy'])
//   .middleware({
//     destroy: ['auth']
//   })

Route.post('/auth', 'Auth/Main.store')
Route.delete('/auth', 'Auth/Main.destroy').middleware('auth')

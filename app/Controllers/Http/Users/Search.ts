import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class UserSearchController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { keyword } = request.all()

    if (!keyword) {
      return response.status(422).send({
        error: { message: 'missing user parameter' }
      })
    }

    const users = await User.query()
      .where('email', 'like', `%${keyword}%`)
      .orWhere('name', 'like', `%${keyword}%`)
      .orWhere('username', 'like', `%${keyword}%`)
      .preload('avatar')

    return users
      .filter(({ id }) => id !== auth.user!.id)
      .map((user) => {
        return user.serialize({
          fields: {
            omit: ['email']
          }
        })
      })
  }
}

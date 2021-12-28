import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { isFollowing } from 'App/Utils'

export default class ProfilesController {
  public async show({ request, response, auth }: HttpContextContract) {
    const { username } = request.qs()

    const user = await User.query()
      .where({ username })
      .preload('avatar')
      .withCount('posts')
      .withCount('followers')
      .withCount('following')
      .first()

    if (!user) {
      return response.status(404).send({
        error: { message: 'usuário não encontrado' }
      })
    }

    if (user.id !== auth.user!.id) {
      await isFollowing(user, auth)
    }

    return user.serialize({
      fields: {
        omit: ['email', 'createdAt', 'updatedAt', 'rememberMeToken']
      }
    })
  }
}

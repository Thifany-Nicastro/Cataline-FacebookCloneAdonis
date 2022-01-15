import test from 'japa'
import { request } from 'Test/utils'
import { UserFactory, PostFactory } from 'Database/Factories'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Example', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('....', async (assert) => {
    const user = await UserFactory.merge({ password: 'secret' }).with('posts', 5).create()
    // const posts = await PostFactory.createMany(5, (post) => post.merge({ userId: user.id }))

    const { body } = await request
      .post('/auth')
      .send({
        email: user.email,
        password: 'secret'
      })
      .expect(200)

    assert.exists(body.token)
  })
})

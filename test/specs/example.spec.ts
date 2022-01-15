import test from 'japa'
import { request } from 'Test/utils'
import { User } from 'App/Models'

test.group('Example', () => {
  test('ensure the login works', async (assert) => {
    await User.create({
      email: 'teste@teste.com',
      password: 'secret',
      username: 'testeuser',
      name: 'teste'
    })

    const { body, status } = await request
      .post('/auth')
      .send({
        email: 'teste@teste.com',
        password: 'secret'
      })
      .expect(200)

    // assert.equal(status, 200)
    assert.exists(body.token)
  })
})

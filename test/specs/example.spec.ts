import test from 'japa'
import { request } from 'Test/utils'
import { User } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Example', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('ensure the login works', async (assert) => {
    await User.create({
      email: 'teste@teste.com',
      password: 'secret',
      username: 'testeuser',
      name: 'teste'
    })

    const { body } = await request
      .post('/auth')
      .send({
        email: 'teste@teste.com',
        password: 'secret'
      })
      .expect(200)

    assert.exists(body.token)
  })

  test('.............', async (assert) => {
    await User.create({
      email: 'teste@teste.com',
      password: 'secret',
      username: 'testeuser',
      name: 'teste'
    })

    const { body, status } = await request.post('/auth').send({
      email: 'teste@teste.com',
      password: 'secret'
    })

    assert.equal(status, 200)
    assert.exists(body.token)
  })
})

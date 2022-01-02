import test from 'japa'
import { request } from 'Test/utils'

test.group('Example', () => {
  test('ensure the root route works', async (assert) => {
    const { body } = await request.get('/')

    assert.exists(body.hello)
    assert.equal(body.hello, 'world')
  })
})

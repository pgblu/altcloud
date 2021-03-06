const test = require('tape')
const request = require('supertest')
const altcloud = require('../../index')
const logger = require('../../lib/default-logger')

test('render html page with front matter', function (t) {
  t.plan(3)

  request(altcloud({root: `${__dirname}/../data`, logger: logger()}))
    .get('/')
    .end(function (err, res) {
      t.error(err)
      t.true(res.text.indexOf('<h1>main header</h1>') !== -1)
      t.true(res.text.indexOf('<p>html content</p>') !== -1)
    })
})

test('render html page with front matter in subdir', function (t) {
  t.plan(3)

  request(altcloud({root: `${__dirname}/../data`, logger: logger()}))
    .get('/sub1/')
    .end(function (err, res) {
      t.error(err)
      t.true(res.text.indexOf('<h1>main header</h1>') !== -1)
      t.true(res.text.indexOf('<p>different html content</p>') !== -1)
    })
})

test('layout example should work', function (t) {
  t.plan(4)

  request(altcloud({root: `${__dirname}/../../examples/layouts`, logger: logger()}))
    .get('/post')
    .end(function (err, res) {
      t.error(err)
      t.true(res.text.indexOf('<h1>Example Post</h1>') !== -1)
      t.true(res.text.indexOf('<h2>Jesse Kriss</h2>') !== -1)
      t.true(res.text.indexOf('<p>This is a boring example post.</p>') !== -1)
    })
})

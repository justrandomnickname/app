import * as jwt from 'jsonwebtoken'

export async function post(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  const token = jwt.sign({ userId: 1 }, 'TOKEN_SECRET', { expiresIn: '24h' })

  // res.statusCode = 401
  // return res.end(JSON.stringify({ username: 'WOOPS!' }))
  return res.end(JSON.stringify({ token }))
}

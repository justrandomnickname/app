import * as jwt from 'jsonwebtoken'

export async function get(req, res, next) {
  /* Initializes */
  res.setHeader('Content-Type', 'application/json')
  /* Retrieves the data */
  const data = req.query
  // Do something with the data...
  /* Returns the result */
  if (data.token) {
    return res.end(JSON.stringify({ userId: jwt.decode(data.token)['userId'] }))
  }
  return res.end({ obj: 'failure!' })
}

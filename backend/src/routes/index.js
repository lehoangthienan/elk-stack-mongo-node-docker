import { Router } from 'express'
import get from 'lodash/get'

import elastic from './elastic'

const routes = Router()

routes.use((req, res, next) => {
  const token = get(req, ['cookies', 'token'])
  if (token) req.headers.authorization = token
  next()
})

routes.get('/', (req, res) => res.status(200).json('API'))
routes.use('/elastics', elastic)

routes.use((err, req, res, next) => {
  if (err.name !== 'HttpError' || !err.errorCode) return next(err)
  res.status(err.errorCode).json({ message: err.message })
})

export default routes
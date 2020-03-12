import { Router } from 'express'

import * as elasticsearchControllers from '../controllers/elasticsearchControllers'

const routes = new Router()

routes.get('/search', elasticsearchControllers.search)
routes.put('/sync', elasticsearchControllers.syncMessage)

export default routes
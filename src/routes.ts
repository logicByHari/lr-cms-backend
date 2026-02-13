import { Router } from 'express'

/* Import Routes */
import userRoutes from '$/user/user.routes.js'

const router = Router()

router.use('/user', userRoutes)

export default router

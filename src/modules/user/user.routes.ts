import { Router } from 'express'
import userController from './user.controller.js'
import { asyncHandler } from '@/utils/handler/asyncHandler.js'
const router = Router()

router.get('/test', asyncHandler(userController.createUser))

export default router

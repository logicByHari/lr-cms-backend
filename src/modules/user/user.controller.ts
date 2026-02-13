import { Request, Response } from 'express'
import userService from './user.service.js'
import { CreateUserZodSchema } from './schema/user.schema.js'
import z from 'zod'

class UserController {
  createUser(req: Request, res: Response) {
    const validateBody = CreateUserZodSchema.safeParse(req.body)
    if (!validateBody.success) {
      return {
        success: false,
        error: z.treeifyError(validateBody.error),
      }
    }
    return userService.createUser(res, req.body)
  }
}

export default new UserController()

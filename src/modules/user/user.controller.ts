import { Request, Response } from 'express'
import userService from './user.service.js'
import { CreateUserZodSchema } from './schema/user.schema.js'
import z from 'zod'
import { Controller, Get, Post, UseMiddleware } from '@/decorators/index.js'
import { loggerMiddleware, authMiddleware } from '@/utils/middleware/example-middlewares.js'

@Controller('user')
export class UserController {
  @Post()
  // @UseMiddleware(loggerMiddleware)
  createUser(req: Request, res: Response) {
    const validateBody = CreateUserZodSchema.safeParse(req.body)
    if (!validateBody.success) {
      return res.status(400).json({
        success: false,
        error: z.treeifyError(validateBody.error),
      })
    }
    return userService.createUser(res, req.body)
  }

  @Get()
  @UseMiddleware([loggerMiddleware, authMiddleware])
  decoratorTest(_req: Request, res: Response) {
    return userService.decoratorTesting(res)
  }
}

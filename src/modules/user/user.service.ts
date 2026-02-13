import db from '$/db/drizzle.js'
import { Response } from 'express'
import { ICreateUser, userSchema } from './schema/user.schema.js'

class UserService {
  async createUser(res: Response, user: ICreateUser) {
    await db.insert(userSchema).values(user)
    return res.json({
      success: true,
      message: 'User Created.',
    })
  }
}

export default new UserService()

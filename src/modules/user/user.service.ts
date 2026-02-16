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

  async decoratorTesting(res: Response) {
    console.log('Promise being awaited.')
    const promise = new Promise((res) => {
      setTimeout(() => {
        res(true)
      }, 5000)
    })
    await promise
    console.log('Promise awaited.')
    return res.json({
      success: true,
      message: 'Decorator is working',
    })
  }
}

export default new UserService()

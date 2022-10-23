import { Request } from 'express'
import { MyStuffUser } from '../model/types'

export type RequestWithUser = Request & {
  user: {
    user: MyStuffUser
  }
}

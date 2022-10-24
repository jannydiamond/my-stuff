import express, { NextFunction, Request, Response } from 'express'
import { InventoryList } from '../../model/types'
import { verifyToken } from '../auth'
import { db } from '../database'
import { RequestWithUser } from '../types'

const inventoryListsRouter = express.Router()

/*************************************************
 * Inventories CRUD
 ************************************************/

inventoryListsRouter.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const data = await db.inventoryLists.selectAll()
    res.status(200).json(data)
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

inventoryListsRouter.post(
  '/',
  verifyToken,
  async (req: Request, res: Response) => {
    const inventory: Omit<InventoryList, 'id' | 'created_at' | 'updated_at'> =
      req.body

    const currentUser = (req as RequestWithUser).user.user

    try {
      const data = await db.inventoryLists.add({
        ...inventory,
        created_by: currentUser.username,
        updated_by: currentUser.username,
      })
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

inventoryListsRouter.put(
  '/:inventoryListId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { inventoryListId } = req.params
    const inventory = req.body
    const currentUser = (req as RequestWithUser).user.user

    const inventoryToUpdate = await db.inventoryLists.findById(inventoryListId)

    if (!inventoryToUpdate) {
      res.statusCode = 400
      res.send('Inventory list does not exist')
      return next()
    }

    try {
      await db.inventoryLists.update({
        ...inventoryToUpdate,
        ...inventory,
        updated_by: currentUser.username,
      })

      res.status(200).json('Inventory list successfully updated!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

inventoryListsRouter.delete(
  '/:inventoryListId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { inventoryListId } = req.params

    try {
      await db.inventoryLists.remove(inventoryListId)
      res.status(200).json('Successfully removed inventory list!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

/*************************************************
 * Inventories get by
 ************************************************/

inventoryListsRouter.get(
  '/:inventoryListId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { inventoryListId } = req.params

    try {
      const data = await db.inventoryLists.findById(inventoryListId)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default inventoryListsRouter

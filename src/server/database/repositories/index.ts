import { InventoryListsRepository } from './inventoryLists'
import { MyStuffUsersRepository } from './users'

// Database Interface Extensions:
export interface IExtensions {
  myStuffUsers: MyStuffUsersRepository
  inventoryLists: InventoryListsRepository
}

export {
  MyStuffUsersRepository,
  InventoryListsRepository,
}

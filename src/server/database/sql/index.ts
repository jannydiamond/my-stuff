import { QueryFile, IQueryFileOptions } from 'pg-promise'
import { join } from 'path'

// Helper for linking to external query files:
const sql = (file: string): QueryFile => {
  const fullPath: string = join(__dirname, file) // generating full path

  const options: IQueryFileOptions = {
    minify: true,
  }

  const queryFile: QueryFile = new QueryFile(fullPath, options)

  if (queryFile.error) {
    console.error(queryFile.error)
  }

  return queryFile
}

export const myStuffUsers = {
  empty: sql('myStuffUsers/empty.sql'),
  add: sql('myStuffUsers/add.sql'),
  remove: sql('myStuffUsers/remove.sql'),
  selectAll: sql('myStuffUsers/selectAll.sql'),
  findById: sql('myStuffUsers/findById.sql'),
  findByName: sql('myStuffUsers/findByName.sql'),
}

export const inventoryLists = {
  empty: sql('inventoryLists/empty.sql'),
  remove: sql('inventoryLists/remove.sql'),
  selectAll: sql('inventoryLists/selectAll.sql'),
  findById: sql('inventoryLists/findById.sql'),
}

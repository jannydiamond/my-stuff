import { IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { MyStuffUser } from '../../../model/types'
import { myStuffUsers as sql } from '../sql'

export class MyStuffUsersRepository {
  /**
   * @param db
   * Automated database connection context/interface.
   *
   * @param pgp
   * Library's root, if ever needed, like to access 'helpers'
   * or other namespaces available from the root.
   */
  constructor(private db: IDatabase<any>, private pgp: IMain) {
    /*
        If your repository needs to use helpers like ColumnSet,
        you should create it conditionally, inside the constructor,
        i.e. only once, as a singleton.
      */
  }

  // Removes all records from the table
  async empty(): Promise<null> {
    return this.db.none(sql.empty)
  }

  // Adds a new myStuffUser, and returns the new object
  async add(myStuffUser: Pick<MyStuffUser, 'username' | 'password'>): Promise<MyStuffUser> {
    return this.db.one(sql.add, myStuffUser)
  }

  //TODO Update

  // Tries to delete a myStuffUser by id, and returns the number of records deleted
  async remove(id: string): Promise<number> {
    return this.db.result(sql.remove, id, (result: IResult) => result.rowCount)
  }

  // Tries to find a myStuffUser by id
  async findById(id: string): Promise<MyStuffUser | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  // Tries to find a myStuffUser by name
  async findByName(username: string): Promise<MyStuffUser | null> {
    return this.db.oneOrNone(sql.findByName, { username })
  }

  // Returns all myStuffUser records
  async selectAll(): Promise<MyStuffUser[]> {
    return this.db.any(sql.selectAll)
  }
}

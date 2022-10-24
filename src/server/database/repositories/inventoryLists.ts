import { ColumnSet, IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { InventoryList } from '../../../model/types'
import { inventoryLists as sql } from '../sql'

export class InventoryListsRepository {
  /**
   * Column set used for inserts
   */
  private insertColumnSet: ColumnSet

  /**
   * Column set used for updates
   */
  private updateColumnSet: ColumnSet

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
    this.insertColumnSet = new pgp.helpers.ColumnSet(
      [
        {
          name: 'inventory_list_name',
        },
        {
          name: 'is_group_list',
          def: false,
        },
        {
          name: 'group_id',
          def: null,
        },
        {
          name: 'created_by',
        },
        {
          name: 'updated_by',
        }
      ],
      {
        table: 'inventory_list',
      }
    )

    this.updateColumnSet = new pgp.helpers.ColumnSet(
      [
        '?id',
        {
          name: 'inventory_list_name',
          skip: (col) => !col.exists,
        },
        {
          name: 'is_group_list',
          skip: (col) => !col.exists,
        },
        {
          name: 'group_id',
          skip: (col) => !col.exists,
        },
        {
          name: 'created_by',
          skip: true,
        },
        {
          name: 'created_at',
          skip: true,
        },
        {
          name: 'updated_by',
          skip: (col) => !col.exists,
        },
        {
          name: 'updated_at',
          init: () => new Date(),
        }
      ],
      {
        table: 'inventory_list',
      }
    )
  }

  // Removes all records from the table
  async empty(): Promise<null> {
    return this.db.none(sql.empty)
  }

  // Adds a new inventory list, and returns the new object
  async add(
    inventory: Omit<InventoryList, 'id' | 'created_at' | 'updated_at'>
  ): Promise<InventoryList> {
    const returnValue = this.pgp.as.format(' RETURNING *')

    const query =
      this.pgp.helpers.insert(inventory, this.insertColumnSet) + returnValue
    return this.db.one(query, inventory)
  }

  async update(inventory: InventoryList): Promise<null> {
    const condition = this.pgp.as.format(' WHERE id = $<id>', {
      id: inventory.id,
    })

    const query =
      this.pgp.helpers.update(inventory, this.updateColumnSet) + condition

    return this.db.none(query)
  }

  // Tries to delete an inventory list by id, and returns the number of records deleted
  async remove(id: string): Promise<number> {
    return this.db.result(
      sql.remove,
      { id },
      (result: IResult) => result.rowCount
    )
  }

  // Tries to find an inventory list by id
  async findById(id: string): Promise<InventoryList | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  // Returns all inventory list records
  async selectAll(): Promise<InventoryList[]> {
    return this.db.any(sql.selectAll)
  }
}

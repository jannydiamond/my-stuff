export interface MyStuffUser { 
    id: string
    username: string
    password: string
    created_at?: Date | null
    updated_at: Date 
}

export interface InventoryList { 
    id: string
    inventory_list_name: string
    is_group_list?: boolean
    group_id?: string
    created_by?: string | null
    created_at?: Date | null
    updated_by?: string | null
    updated_at: Date
}
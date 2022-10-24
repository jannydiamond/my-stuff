CREATE extension IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS mystuff_user
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mystuff_group
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    group_name text NOT NULL,
    created_by text references mystuff_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references mystuff_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_list
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_list_name text NOT NULL,
    is_group_list boolean,
    group_id uuid references mystuff_group(id) ON DELETE CASCADE,
    created_by text references mystuff_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references mystuff_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

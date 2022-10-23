CREATE extension IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS mystuff_user
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

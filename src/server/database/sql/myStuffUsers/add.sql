/*
    Adds a new user.
*/
INSERT INTO mystuff_user(username, password)
VALUES(${username}, ${password})
RETURNING *

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    is_done BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

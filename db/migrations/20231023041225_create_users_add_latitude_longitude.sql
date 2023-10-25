-- migrate:up
ALTER TABLE users ADD COLUMN latitude DOUBLE;

ALTER TABLE users ADD COLUMN longitude DOUBLE;

-- migrate:down

ALTER TABLE users DROP COLUMN latitude;

ALTER TABLE users DROP COLUMN longitude;
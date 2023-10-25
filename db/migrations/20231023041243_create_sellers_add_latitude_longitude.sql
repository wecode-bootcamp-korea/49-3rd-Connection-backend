-- migrate:up
ALTER TABLE sellers ADD COLUMN latitude DOUBLE;

ALTER TABLE sellers ADD COLUMN longitude DOUBLE;

-- migrate:down

ALTER TABLE sellers DROP COLUMN latitude;

ALTER TABLE sellers DROP COLUMN longitude;



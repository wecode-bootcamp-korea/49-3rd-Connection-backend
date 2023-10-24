-- migrate:up
ALTER Table users ADD points integer not null default 0

-- migrate:down
alter table users drop COLUMN points

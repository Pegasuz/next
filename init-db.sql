-- Initialize database schema

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Example table for the example-feature module
CREATE TABLE IF NOT EXISTS examples (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_examples_created_at ON examples(created_at);

-- Insert sample data (optional)
-- INSERT INTO examples (id, name) VALUES 
--   (uuid_generate_v4(), 'Sample Example 1'),
--   (uuid_generate_v4(), 'Sample Example 2');

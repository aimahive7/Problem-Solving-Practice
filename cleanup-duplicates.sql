-- SQL script to find and remove duplicate users based on username and email

-- First, identify duplicates
SELECT 
    username, 
    email, 
    phone,
    COUNT(*) as duplicate_count,
    MIN(id) as keep_id,
    ARRAY_AGG(id ORDER BY id) as all_ids
FROM users
GROUP BY username, email, phone
HAVING COUNT(*) > 1;

-- Remove duplicates, keeping the record with the smallest ID
DELETE FROM users 
WHERE id NOT IN (
    SELECT DISTINCT ON (username, email, phone) id 
    FROM users 
    ORDER BY username, email, phone, id ASC
);

-- Verify removal
SELECT 
    username, 
    email, 
    phone,
    COUNT(*) as count
FROM users
GROUP BY username, email, phone
HAVING COUNT(*) > 1;
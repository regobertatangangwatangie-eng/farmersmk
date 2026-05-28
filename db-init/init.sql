-- Database initialization script for farmersmk
-- Create tables as needed

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add more tables as needed

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    group_id INTEGER REFERENCES groups(id),
    community_id INTEGER REFERENCES communities(id),
    content TEXT,
    media_id INTEGER REFERENCES media(id),
    is_favorited BOOLEAN DEFAULT FALSE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group members
CREATE TABLE IF NOT EXISTS group_members (
    group_id INTEGER REFERENCES groups(id),
    user_id INTEGER REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, user_id)
);

-- Communities table
CREATE TABLE IF NOT EXISTS communities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Community members
CREATE TABLE IF NOT EXISTS community_members (
    community_id INTEGER REFERENCES communities(id),
    user_id INTEGER REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (community_id, user_id)
);

-- Calls table
CREATE TABLE IF NOT EXISTS calls (
    id SERIAL PRIMARY KEY,
    initiator_id INTEGER REFERENCES users(id),
    group_id INTEGER REFERENCES groups(id),
    community_id INTEGER REFERENCES communities(id),
    call_type VARCHAR(20), -- audio, video, group
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP
);

-- Call participants
CREATE TABLE IF NOT EXISTS call_participants (
    call_id INTEGER REFERENCES calls(id),
    user_id INTEGER REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP,
    PRIMARY KEY (call_id, user_id)
);

-- Media table
CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    uploader_id INTEGER REFERENCES users(id),
    media_type VARCHAR(20), -- image, video, audio, reel
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Starred messages
CREATE TABLE IF NOT EXISTS starred_messages (
    user_id INTEGER REFERENCES users(id),
    message_id INTEGER REFERENCES messages(id),
    starred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, message_id)
);

-- Linked devices
CREATE TABLE IF NOT EXISTS linked_devices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    device_info TEXT,
    linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

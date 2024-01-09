
-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    country VARCHAR(2)
);

-- @block
INSERT INTO Users(email, bio, country)
VALUES(
    'test@gmail.com',
    'foo',
    'FR'
);
--@block

SELECT * FROM users;

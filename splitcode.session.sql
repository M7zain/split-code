

-- @block 
SHOW DATABASES; 

-- @block 
CREATE TABLE clerk_users( 
    user_id PRIMARY KEY,
);


-- @block 

CREATE TABLE posts( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL, 
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- @block 

SELECT * FROM posts;


-- @block

INSERT INTO posts(title, content)
VALUES(
    "create a react application",
    "I need someone create a simple react app"
),
(
    "university project in VR",
    "I need someone to make a project for me in vr"
); 
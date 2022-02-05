CREATE TABLE blogs(
    id SERIAL PRIMARY KEY,
    author VARCHAR(200),
    url TEXT NOT NULL,
    title VARCHAR(200) NOT NULL,
    likes INTEGER DEFAULT 0 NOT NULL
);

INSERT INTO blogs(author,url,title) VALUES('Dan Abramov','https://overreacted.io/on-let-vs-const/','On let vs const'),
('Laurenz Albe','https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/','Gaps in sequences in PostgreSQL');
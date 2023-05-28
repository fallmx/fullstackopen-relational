CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Pentti', 'http://www.pentinblogi.fi', 'Pentin blogi');

INSERT INTO blogs (url, title, likes) VALUES ('http://www.blogi.fi', 'Blogi', 5);

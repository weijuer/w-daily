-- SQLite
CREATE TABLE daily (id integer PRIMARY KEY NOT NULL, title text, author text, summary text, url text, createTime integer, updateTime integer)

INSERT INTO daily VALUES (1, 'title01', 'author01', 'summary01', 'http://url.cn', 0, 0);
INSERT INTO daily VALUES (2, 'title02', 'author02', 'summary02', 'http://url.cn', 0, 0);

SELECT * FROM daily;
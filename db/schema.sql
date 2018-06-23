### Schema

CREATE DATABASE recommendations_db;
USE recommendations_db;

CREATE TABLE recommendations
(
	id int NOT NULL AUTO_INCREMENT,
	author varchar(255) NOT NULL,
	category ENUM ('books', 'movies', 'shows', 'songs', 'restaurants'),
    title varchar(255) NOT NULL,
    post TEXT NOT NULL,
    image_url varchar(2083) NOT NULL,
	PRIMARY KEY (id)
);


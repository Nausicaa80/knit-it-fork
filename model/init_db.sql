--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists projects;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE projects(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) not null,
    designer VARCHAR(255) not null,
    yarn VARCHAR(255) not null,
    needles VARCHAR(255) not null,
    start VARCHAR(255) not null,
    end VARCHAR(255),
    completed BOOLEAN, PRIMARY KEY (id),
    img VARCHAR (2500) not null
    );

    --
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists projects;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE projects(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) not null,
    designer VARCHAR(255) not null,
    yarn VARCHAR(255) not null,
    needles VARCHAR(255) not null,
    start VARCHAR(255) not null,
    end VARCHAR(255),
    completed BOOLEAN, PRIMARY KEY (id),
    img VARCHAR (2500) not null
    );

    CREATE TABLE tutorials (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(2500) NOT NULL,
    url VARCHAR(2500) NOT NULL,
    youtubeId VARCHAR (200) NOT NULL,
);
    



    INSERT into tutorials (title, url, youtubeID) VALUES
    ('Knitting for Beginners' , 'https://www.youtube.com/watch?v=hM5M2Fu0RtY', 'https://www.youtube.com/watch?v=hM5M2Fu0RtY', 'hM5M2Fu0RtY'),
    ('How to PURL STITCH for Total Beginners', 'https://www.youtube.com/watch?v=7ePhLqw6HDM', 'https://www.youtube.com/watch?v=7ePhLqw6HDM','7ePhLqw6HDM' ),
    ('Continental Knitting Two Ways', 'https://www.youtube.com/watch?v=q92bAeVFdao', 'https://www.youtube.com/watch?v=q92bAeVFdao', 'q92bAeVFdao' ); 
--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists projects;
DROP TABLE if exists tutorials;
SET foreign_key_checks = 1;

--
-- Create Tables
--



--
-- Create Tables
--
CREATE TABLE projects(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    designer VARCHAR(255) NOT NULL,
    yarn VARCHAR(255) NOT NULL,
    needles VARCHAR(255) NOT NULL,
    start VARCHAR(255) NOT NULL,
    end VARCHAR(255),
    img VARCHAR(2500) NOT NULL
);

    CREATE TABLE tutorials (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(2500) NOT NULL,
    url VARCHAR(2500) NOT NULL
);

INSERT INTO tutorials (title, url) VALUES
('Knitting for Beginners', '<iframe width="560" height="315" src="https://www.youtube.com/embed/hM5M2Fu0RtY?si=WTAFrPm7N50E5yw8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'),
('How to PURL STITCH for Total Beginners', '<iframe width="560" height="315" src="https://www.youtube.com/embed/7ePhLqw6HDM?si=Gs-6esnhcdODljWX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'),
('Continental Knitting Two Ways', '<iframe width="560" height="315" src="https://www.youtube.com/embed/q92bAeVFdao?si=IPV_V9GOLoHT-wFG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
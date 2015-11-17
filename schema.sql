/* delete the database if it already exists and create a new one*/
DROP DATABASE IF EXISTS wanderblog;
CREATE DATABASE wanderblog;

USE wanderblog;

DROP TABLE IF EXISTS user;
CREATE TABLE user(
    id INTEGER PRIMARY KEY auto_increment,
    type VARCHAR(10) NOT NULL,
    name VARCHAR(50) NOT NULL,
    login_name VARCHAR(16) NOT NULL,
    password VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL,
    description TINYTEXT(20) NULL,
    avatar VARCHAR(10) NULL
)engine=innodb;

DROP TABLE IF EXISTS adventure;
CREATE TABLE adventure(
    id INTEGER PRIMARY KEY auto_increment,
    title VARCHAR(30) NOT NULL,
    location VARCHAR(50) NOT NULL,
    visit_date DATE NOT NULL,
    post_date DATETIME(6) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)engine=innodb;

DROP TABLE IF EXISTS tag;
CREATE TABLE tag(
    id INTEGER PRIMARY KEY auto_increment,
    name VARCHAR(20) NOT NULL
)engine=innodb;

DROP TABLE IF EXISTS adventure_tag;
CREATE TABLE adventure_tag(
    adventure_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (adventure_id) REFERENCES adventure(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
)engine=innodb;

DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
    id INTEGER PRIMARY KEY auto_increment,
    post_date DATETIME(6) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    adventure_id INTEGER NOT NULL,
    FOREIGN KEY (adventure_id) REFERENCES adventure(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)engine=innodb;

DROP TABLE IF EXISTS picture;
CREATE TABLE picture(
    id INTEGER PRIMARY KEY auto_increment,
    adventure_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    url VARCHAR(50) NOT NULL,
    FOREIGN KEY (adventure_id) REFERENCES adventure(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)engine=innodb;

DROP TABLE IF EXISTS rating;
CREATE TABLE rating(
    id INTEGER PRIMARY KEY auto_increment,
    adventure_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (adventure_id) REFERENCES adventure(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)engine=innodb;
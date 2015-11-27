/* delete the database if it already exists and create a new one*/
DROP DATABASE IF EXISTS wanderblog;
CREATE DATABASE wanderblog;

/* switch to databasde wanderblog */
USE wanderblog;


/*create table users - user information */
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INTEGER(10) NOT NULL AUTO_INCREMENT, #primary key
    type VARCHAR(6) NOT NULL, #user type (admin, author or reader)
    name VARCHAR(255) NOT NULL, #full name of the user
    login_name VARCHAR(16) NOT NULL, #name used to log in to site
    email VARCHAR(255) NOT NULL, #email used to sign up for site
    password VARCHAR(255) NOT NULL, #user password
    registered_on DATETIME NOT NULL,
    country VARCHAR(50) NOT NULL, #user's home country
    description TINYTEXT NULL, #short statement about user
    avatar VARCHAR(255) NULL, #user's icon/image
    PRIMARY KEY(id),
    UNIQUE KEY(login_name), #login_name must be unique
    UNIQUE KEY(email) #email must be unique
)engine=innodb;

/*create table adventure - trip information*/
DROP TABLE IF EXISTS adventure;
CREATE TABLE adventure(
    id INTEGER(10) NOT NULL AUTO_INCREMENT, #primary key
    title VARCHAR(255) NOT NULL, #heading for the adventure
    location VARCHAR(255) NOT NULL, #where the adventure took place
    content_text TEXT NULL, #about the adventure
    visit_date DATE NOT NULL, #date the user was on the adventure
    post_date DATETIME NOT NULL, #date when the adventure was posted to wanderblog
    user_id INTEGER(10) NOT NULL, #user who posted the adventure
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
)engine=innodb;

/*create table tag - tags*/
DROP TABLE IF EXISTS tag;
CREATE TABLE tag(
    id INTEGER(10) auto_increment, #primary key
    name VARCHAR(255) NOT NULL, #a tag name
    PRIMARY KEY(id),
    UNIQUE KEY(name) #tag names must be unique (dupicates increase redundancy)
)engine=innodb;

/*create table adventure_tag - adventure - tag relationship*/
DROP TABLE IF EXISTS adventure_tag;
CREATE TABLE adventure_tag(
    adventure_id INTEGER(10) NOT NULL, #adventure the tag is used in
    tag_id INTEGER(10) NOT NULL, #tag used
    PRIMARY KEY(adventure_id, tag_id), #composite primary
    FOREIGN KEY (adventure_id) REFERENCES adventure(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE
)engine=innodb;

/*create table comment - comments posted on adventures*/
DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
    id INTEGER(10) auto_increment, #primary key
    post_date DATETIME NOT NULL, #date when comment was posted
    content TEXT NOT NULL, #the comment text
    user_id INTEGER(10) NOT NULL, #posted by
    adventure_id INTEGER(10) NOT NULL, #posted to
    PRIMARY KEY(id),
    FOREIGN KEY (adventure_id) REFERENCES adventure(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
)engine=innodb;

/*create table picture - pictures used in adventures*/
DROP TABLE IF EXISTS picture;
CREATE TABLE picture(
    id INTEGER(10) auto_increment, #primary key
    adventure_id INTEGER(10) NOT NULL, #belongs to adventure
    user_id INTEGER(10) NOT NULL, #uploaded by
    url VARCHAR(255) NOT NULL, #file location
    PRIMARY KEY(id),
    UNIQUE KEY(url),
    FOREIGN KEY (adventure_id) REFERENCES adventure(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
)engine=innodb;

/*create table rating - votes by users*/
DROP TABLE IF EXISTS rating;
CREATE TABLE rating(
    id INTEGER(10) auto_increment, #primary key
    adventure_id INTEGER(10) NOT NULL, #adventure rated
    user_id INTEGER(10) NOT NULL, #rated by
    score DECIMAL(3,1) NOT NULL, #rate given (1-10)
    PRIMARY KEY(id),
    UNIQUE KEY(adventure_id, user_id), #restricts single rating by a user on particular adventure
    FOREIGN KEY (adventure_id) REFERENCES adventure(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
)engine=innodb;
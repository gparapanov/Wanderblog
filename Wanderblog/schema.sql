drop database if exists wanderblog;

create database if not exists wanderblog;

use wanderblog;

drop table if exists w_user;

create table if not exists w_user(
   id integer primary key auto_increment,
   type varchar(10) unique,
   name varchar(50),
   login_name varchar(20),
   password varchar(20),
   country varchar(20),
   avatar varchar(10)
)engine=innodb;

insert into w_user
values(1, "Author", "Firstname Surname", "login_name", "login_password", "country", "picture");
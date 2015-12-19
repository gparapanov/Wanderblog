# Wander blog 
Dummy accounts added for John:
click RAW to see them properly
type    name        username    email                           password
admin	John Smith	admin123	nunc.sed.pe1d1e@imperdiet.co.uk	123456;
admin	Dave Smith	admin1234	nunc.sed.pe1d1e1@imperdiet.co.uk	123456;
reader	Pete Smith	psmith	nunc.sed.pe11d1e@imperdiet.co.uk	123456;
reader	Frank Longbottom	flongb	nunc.sed2.pe1d1e@imperdiet.co.uk	123456;
reader	Harry Potter	hpotter	nunc.sed.p3e1d1e@imperdiet.co.uk	123456;
reader	Ron Weasley	rweasley	nunc.sed.p4e1d1e@imperdiet.co.uk	123456;
reader	Severus Snape	ssnape	nunc.sed.p5e1d1e@imperdiet.co.uk	123456;
author	Donald Trump	dtrump	nunc.sed.pe61d1e@imperdiet.co.uk	123456;
author	Jeb Bush	jebbush	nunc.sed.pe17d1e@imperdiet.co.uk	123456;
author	Barack Obama	mrpresident	nunc.8sed.pe1d1e@imperdiet.co.uk	123456;

Wander blog is  a blog engine designed for travellers who want to share their experience with their fans.


### Version
1.0.0

### Tech

What you need:

* NodeJS
* npm package manager


### Installation
To install our app you need to dowload or pull the project
Next enter the folder with app through your command line and type
```sh
$ npm install
```
This will install all the dependencies that you need.

### Create your local db
Go to your mysql command line and type:
```sh
$ create database your_name_of_database;
```

### Specify the db that you are using in mysql_setup.js file
```sh
var connection = mysql.createConnection({
    //Here put credentials for your local sql.
    host     : 'the name of the host of your local db.',
    user     : 'your user name',
    password : 'your password for local db',
    database : 'wanderblog'
});
```

### Create and populate database

Run schema.sql, constraints.sql and populate.sql in this order



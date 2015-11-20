# Wander blog 


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



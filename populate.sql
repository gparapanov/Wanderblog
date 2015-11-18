USE wanderblog;
#populate tables here

#dummy data


INSERT INTO users (id,type,name,login_name,email,password,country,description,avatar)
VALUES (DEFAULT,"reader","Herrod Whitehead","ipsum","nunc.sed.pede@imperdiet.co.uk","HDV28RVL2CJ","Isle of Man","vulputate dui, nec tempus mauris erat eget","non,"),
(DEFAULT,"admin","Benjamin Rivas","mollis.","dolor.sit.amet@dapibusrutrum.org","FJN31HCX5WF","Ghana","Aenean eget metus. In nec orci.","turpis"),
(DEFAULT,"reader","Audra Armstrong","orci","arcu.Morbi.sit@Namporttitorscelerisque.net","RAE39ZUS2HI","Congo (Brazzaville)","posuere cubilia Curae; Phasellus ornare. Fusce mollis. Duis","nec"),
(DEFAULT,"author","Noah Hart","nec","adipiscing.non.luctus@elit.ca","JKS28TMH3ZB","San Marino","molestie sodales. Mauris blandit enim consequat purus. Maecenas","montes,"),
(DEFAULT,"admin","Stewart Wilder","fermentum","aliquet.molestie.tellus@nulla.edu","NFE07LUK9ZP","Liechtenstein","tempor arcu. Vestibulum ut eros","natoque"),
(DEFAULT,"reader","Oleg Terrell","aliquam","Pellentesque@arcu.com","PNF00APM5YO","Falkland Islands","natoque penatibus et magnis dis parturient montes, nascetur","metus."),
(DEFAULT,"author","Emery Gillespie","scelerisque,","mi.tempor@nonnisi.edu","SHE82VQX9DV","Ireland","ut odio vel est tempor bibendum.","aliquet"),
(DEFAULT,"author","Knox Glass","neque","leo.Cras@malesuada.edu","TYN88ZEX4OL","Congo, the Democratic Republic of the","sem ut cursus luctus, ipsum leo elementum sem, vitae","lacinia"),
(DEFAULT,"reader","Vance Colon","lorem","mauris.eu@Nulla.org","QWS92VXJ2KT","Panama","diam vel arcu. Curabitur ut odio vel","et"),
(DEFAULT,"author","Bryar Booth","a","Nunc@Aliquamornare.ca","TTM88DXQ5EP","Libya","dignissim magna a tortor. Nunc commodo auctor","cursus");


INSERT INTO adventure (id,title,location,visit_date,post_date,user_id)
VALUES (DEFAULT,"nibh. Aliquam ornare, libero","Macao","2016-11-04","2015-08-02",5),
(DEFAULT,"Duis elementum, dui quis","Gabon","2015-02-25","2016-07-16",6),
(DEFAULT,"facilisis lorem tristique aliquet.","Albania","2016-10-30","2016-10-25",9),
(DEFAULT,"elit erat vitae risus.","Burkina Faso","2016-05-15","2016-09-02",9),
(DEFAULT,"Nulla facilisi. Sed neque.","Micronesia","2016-02-19","2015-09-20",10),
(DEFAULT,"et, rutrum eu, ultrices","Sweden","2016-07-30","2015-05-11",6),
(DEFAULT,"dolor dolor, tempus non,","Mexico","2015-08-25","2016-10-18",5),
(DEFAULT,"enim consequat purus. Maecenas","Liechtenstein","2015-11-28","2016-08-09",7),
(DEFAULT,"libero. Morbi accumsan laoreet","Cook Islands","2015-02-20","2016-09-27",8),
(DEFAULT,"leo. Vivamus nibh dolor,","Swaziland","2016-06-17","2015-01-31",8);


INSERT INTO tag (id,name)
VALUES (DEFAULT,"Donec"),
(DEFAULT,"pede."),
(DEFAULT,"sodales"),
(DEFAULT,"Sed"),
(DEFAULT,"accumsan"),
(DEFAULT,"at,"),
(DEFAULT,"nisl."),
(DEFAULT,"med"),
(DEFAULT,"Curabitur"),
(DEFAULT,"non,");



INSERT INTO adventure_tag (adventure_id,tag_id)
VALUES (2,8),(6,4),(9,9),(2,1),(3,9),(7,10),(3,3),(1,4),(1,5),(2,5);


INSERT INTO comment (id,post_date,content,user_id,adventure_id)
VALUES (DEFAULT,"2015-10-10","ante ipsum primis in faucibus orci luctus et ultrices",4,7),
(DEFAULT,"2015-02-07","vel, faucibus id, libero. Donec consectetuer mauris id sapien.",4,9),
(DEFAULT,"2015-07-16","ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus.",3,6),
(DEFAULT,"2015-11-03","blandit mattis. Cras eget nisi dictum augue malesuada malesuada.",4,9),
(DEFAULT,"2016-10-01","vitae risus. Duis a mi fringilla mi lacinia mattis. Integer",4,4),
(DEFAULT,"2016-01-07","lorem, auctor quis, tristique ac, eleifend vitae, erat.",10,1),
(DEFAULT,"2015-05-17","mollis. Phasellus libero mauris, aliquam eu, accumsan sed,",2,5),
(DEFAULT,"2016-04-22","imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat.",1,10),
(DEFAULT,"2016-06-16","nec tempus mauris erat eget ipsum. Suspendisse",4,7),
(DEFAULT,"2016-09-13","eleifend nec, malesuada ut, sem. Nulla interdum.",7,8);


INSERT INTO picture (id,adventure_id,user_id,url)
VALUES (DEFAULT,6,3,"tellus id"),
(DEFAULT,4,6,"ipsum leo"),
(DEFAULT,8,5,"neque sed"),
(DEFAULT,9,4,"nulla at"),
(DEFAULT,1,8,"tempor erat"),
(DEFAULT,7,8,"libero. Morbi"),
(DEFAULT,3,2,"quis arcu"),
(DEFAULT,5,10,"ipsum primis"),
(DEFAULT,4,10,"Nulla interdum."),
(DEFAULT,2,8,"consequat purus.");



INSERT INTO rating (id,adventure_id,user_id,score)
VALUES (DEFAULT,8,8,8),
(DEFAULT,5,4,9),
(DEFAULT,2,10,10),
(DEFAULT,3,8,10),
(DEFAULT,8,6,6),
(DEFAULT,2,9,9),
(DEFAULT,8,3,7),
(DEFAULT,5,1,8),
(DEFAULT,9,1,7),
(DEFAULT,6,7,7);
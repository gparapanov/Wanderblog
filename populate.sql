USE wanderblog;
#populate tables here

#dummy data


INSERT INTO users (id,type,name,login_name,email,password,registered_on,country,description,avatar)
VALUES (1,"reader","Herrod Whitehead","ipsum","nunc.sed.pede@imperdiet.co.uk","HDV28RVL2CJ","2014-08-08","Isle of Man","vulputate dui, nec tempus mauris erat eget","non,"),
(2,"admin","Benjamin Rivas","mollis.","dolor.sit.amet@dapibusrutrum.org","FJN31HCX5WF","2014-08-08","Ghana","Aenean eget metus. In nec orci.","turpis"),
(3,"reader","Audra Armstrong","orci","arcu.Morbi.sit@Namporttitorscelerisque.net","RAE39ZUS2HI","2014-08-08","Congo (Brazzaville)","posuere cubilia Curae; Phasellus ornare. Fusce mollis. Duis","nec"),
(4,"author","Noah Hart","nec","adipiscing.non.luctus@elit.ca","JKS28TMH3ZB","2014-08-08","San Marino","molestie sodales. Mauris blandit enim consequat purus. Maecenas","montes,"),
(5,"admin","Stewart Wilder","fermentum","aliquet.molestie.tellus@nulla.edu","NFE07LUK9ZP","2014-08-08","Liechtenstein","tempor arcu. Vestibulum ut eros","natoque"),
(6,"reader","Oleg Terrell","aliquam","Pellentesque@arcu.com","PNF00APM5YO","2014-08-08","Falkland Islands","natoque penatibus et magnis dis parturient montes, nascetur","metus."),
(7,"author","Emery Gillespie","scelerisque,","mi.tempor@nonnisi.edu","SHE82VQX9DV","2014-08-08","Ireland","ut odio vel est tempor bibendum.","aliquet"),
(8,"author","Knox Glass","neque","leo.Cras@malesuada.edu","TYN88ZEX4OL","2014-08-08","Congo, the Democratic Republic of the","sem ut cursus luctus, ipsum leo elementum sem, vitae","lacinia"),
(9,"reader","Vance Colon","lorem","mauris.eu@Nulla.org","QWS92VXJ2KT","2014-08-08","Panama","diam vel arcu. Curabitur ut odio vel","et"),
(10,"author","Bryar Booth","aba","Nunc@Aliquamornare.ca","TTM88DXQ5EP","2014-08-08","Libya","dignissim magna a tortor. Nunc commodo auctor","cursus");


INSERT INTO adventure (id,title,location,content_text,visit_date,post_date,user_id)
VALUES (1,"My fun adventure","Krishnanagar","sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris","2014-08-08","2015-06-23 10:02:44",1),
(2,"Another Day In Paradise","Timkur","tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a","2014-02-24","2015-06-19 17:11:49",3),
(3,"Come On A Safari With Me","Fauvillers","diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer","2015-09-30","2015-10-10 07:10:30",8),
(4,"Bon Voyage!","Sereflikochisasar","malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit.","2014-08-11","2015-07-08 08:01:45",9),
(5,"Beyond The Sea","Rabbi","tellus lorem eu metus. In lorem. Donec elementum, lorem ut","2015-07-07","2016-06-07 19:17:23",4),
(6,"Having A Wonderful Time","Gonnosfanadiga","vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim.","2015-11-15","2016-03-14 11:54:11",1),
(7,"Around The World","Albagiara","eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit","2014-05-26","2016-06-28 10:29:50",3),
(8,"Down By The Sea","Newton Stewart","leo, in lobortis tellus justo sit amet nulla. Donec non","2014-02-21","2016-08-11 04:12:11",5),
(9,"Having A Wonderful Time","Valley East","tempor erat neque non quam. Pellentesque habitant morbi tristique senectus","2014-06-26","2015-05-02 07:20:51",3),
(10,"Around The World","Biloxi","Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada","2014-08-31","2016-10-13 03:18:41",9);


INSERT INTO tag (id,name)
VALUES (1,"Donec"),
(2,"pede."),
(3,"sodales"),
(4,"Sed"),
(5,"accumsan"),
(6,"at,"),
(7,"nisl."),
(8,"med"),
(9,"Curabitur"),
(10,"non,");



INSERT INTO adventure_tag (adventure_id,tag_id)
VALUES (2,8),(6,4),(9,9),(2,1),(3,9),(7,10),(3,3),(1,4),(1,5),(2,5);


INSERT INTO comment (id,post_date,content,user_id,adventure_id)
VALUES (1,"2015-10-10","ante ipsum primis in faucibus orci luctus et ultrices",4,7),
(2,"2015-02-07","vel, faucibus id, libero. Donec consectetuer mauris id sapien.",4,9),
(3,"2015-07-16","ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus.",3,6),
(4,"2015-11-03","blandit mattis. Cras eget nisi dictum augue malesuada malesuada.",4,9),
(5,"2016-10-01","vitae risus. Duis a mi fringilla mi lacinia mattis. Integer",4,4),
(6,"2016-01-07","lorem, auctor quis, tristique ac, eleifend vitae, erat.",10,1),
(7,"2015-05-17","mollis. Phasellus libero mauris, aliquam eu, accumsan sed,",2,5),
(8,"2016-04-22","imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat.",1,10),
(9,"2016-06-16","nec tempus mauris erat eget ipsum. Suspendisse",4,7),
(10,"2016-09-13","eleifend nec, malesuada ut, sem. Nulla interdum.",7,8);


INSERT INTO picture (id,adventure_id,user_id,url)
VALUES (1,6,3,"tellus id"),
(2,4,6,"ipsum leo"),
(3,8,5,"neque sed"),
(4,9,4,"nulla at"),
(5,1,8,"tempor erat"),
(6,7,8,"libero. Morbi"),
(7,3,2,"quis arcu"),
(8,5,10,"ipsum primis"),
(9,4,10,"Nulla interdum."),
(10,2,8,"consequat purus.");



INSERT INTO rating (id,adventure_id,user_id,score)
VALUES (1,8,8,8),
(2,5,4,9),
(3,2,10,10),
(4,3,8,10),
(5,8,6,6),
(6,2,9,9),
(7,8,3,7),
(8,5,1,8),
(9,9,1,7),
(10,6,7,7);
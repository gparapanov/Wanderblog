
module.exports = function (app,db,path,fs,fse,multer) {

    //multer
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    });

    function moveFiles(req, res, next){
        var to_path = './uploads/2'; // change the number 2 to user id
        fs.exists(to_path, function(exists){
            if(!exists){
                fse.mkdirs(to_path, function(err){
                    if(err){
                        res.send("Error uploading files!");
                    }
                });
            }
        });
        for(var i = 0; i < req.files.length; i++){
            var c_file = req.files[i];
            fse.move('./uploads/'+c_file.filename, to_path+'/'+c_file.filename, function(err){
                if(err){
                    res.send("Error uploading files!");
                }
            });
        }
        next();
    }
    var upload = multer({storage: storage});

    app.get('/adventureForm', function (req, res) {
        res.render('adventureForm.jade');
    });

    app.post('/adventureForm', upload.array('pictures',5), moveFiles, function (req, res) {
        //res.json(req.body);
        //res.render('register.jade');
       // if(req.session.isLoggedIn) {
            var dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            var adventure = {
                title: req.body.textinput + "",
                //location: req.body.lat+"!"+req.body.lon,
                location:req.body.adventureLocation+"",
                content_text: req.body.adventureContent + "",
                visit_date: '2014-02-21',
                post_date: dateNow,
                user_id: req.session.isLoggedIn
                //http://logicify.github.io/jquery-locationpicker-plugin/
            };


            db.getConnection(function (err, connection) {
                connection.query('insert into adventure set ?', adventure, function (err, result) {
                    //catch mysql connection error
                    if (err) throw err;
                    connection.release();
                });


            });
        var alltags=req.body.adventureTags+"";
        var tagArray=alltags.split('#');
        db.getConnection(function (err, connection) {
                //catch mysql connection error
                if (err) throw err;
                for(var i=1;i<tagArray.length;i++){
                    var toInsert={
                        name:tagArray[i]
                    };
                    connection.query('insert ignore into tag set ?',toInsert,function(err1,result){
                        if (err1) throw err1;
                        console.log(toInsert.name);
                    });
                }
                for(var i=1;i<tagArray.length;i++){
                    //console.log(tagArray[i]);
                    connection.query("select tag.id from tag where tag.name='"+tagArray[i]+"'",function(err1,rows){
                        if (err1) throw err1;
                        connection.query('select max(id) as id from adventure',function(err1,rows1){
                            if (err1) throw err1;
                            toInsert={
                                adventure_id:parseInt(rows1[0].id),
                                tag_id:parseInt(rows[0].id)
                            };
                            //console.log(toInsert.adventure_id+" "+toInsert.tag_id);
                            connection.query('insert into adventure_tag set ?',toInsert,function(err1,rows2){
                                if (err1) throw err1;

                            });
                        });

                    });
                }
                connection.release();
        });

        res.redirect('/');
      //  }
      //  else{
            //Add message that user has to be logged in to see this page.
           // res.redirect('/');
        //}
    });
}

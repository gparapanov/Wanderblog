/*switch to database wanderblog*/
USE wanderblog;

/*Delete trigger if already exists*/
DROP TRIGGER IF EXISTS chk_user_type_on_insert;
DROP TRIGGER IF EXISTS chk_user_type_on_update;
DROP TRIGGER IF EXISTS chk_rating_bounds_on_insert;
DROP TRIGGER IF EXISTS chk_rating_bounds_on_update;

delimiter //
#check user type is admin, author or reader before inserting
CREATE TRIGGER chk_user_type_on_insert BEFORE INSERT ON users
FOR EACH ROW
BEGIN
	IF NEW.type != 'admin' AND NEW.type != 'author' AND NEW.type != 'reader' THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Check user type in (admin, author, reader)!';
    END IF;
END;
//
//
#check user type is admin, author or reader before updating
CREATE TRIGGER chk_user_type_on_update BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
	IF NEW.type != 'admin' AND NEW.type != 'author' AND NEW.type != 'reader' THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Check user type in (admin, author, reader)!';
    END IF;
END;
//
//
#check rating is between 0 and 10 before inserting
CREATE TRIGGER chk_rating_bounds_on_insert BEFORE INSERT ON rating
FOR EACH ROW
BEGIN
	IF NEW.score < 0 OR NEW.score > 10 THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Score out of bounds MIN 0 MAX 10!';
	END IF;
END;
//
//
#check rating is between 0 and 10 before updating
CREATE TRIGGER chk_rating_bounds_on_update BEFORE UPDATE ON rating
FOR EACH ROW
BEGIN
	IF NEW.score < 0 OR NEW.score > 10 THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Score out of bounds MIN 0 MAX 10!';
	END IF;
END; 
//
delimiter ;


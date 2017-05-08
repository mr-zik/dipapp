
CREATE TABLE `testnodedb`.`images_flat_sell` (
`image_id` INT NOT NULL AUTO_INCREMENT ,
`flat_id` INT NOT NULL ,
`user_id` INT NOT NULL ,
`name` VARCHAR( 60 ) NOT NULL ,
`path` VARCHAR( 60 ) NOT NULL ,
`status` VARCHAR( 10 ) NOT NULL ,
PRIMARY KEY ( `image_id` )
) ENGINE = MYISAM ;

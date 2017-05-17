DROP TABLE IF EXISTS `testnodedb`.`commercial_sell` ;

CREATE TABLE IF NOT EXISTS `testnodedb`.`commercial_sell` (
  `obj_id` INT NOT NULL,
  `user_id` VARCHAR(45) NULL,
  `obj_type` VARCHAR(45) NULL,
  `addr_city` VARCHAR(45) NULL,
  `addr_street` VARCHAR(45) NULL,
  `addr_object_number` VARCHAR(45) NULL,
  `obj_name` VARCHAR(45) NULL,
  `obj_description` VARCHAR(45) NULL,
  `obj_square` VARCHAR(45) NULL,
  `obj_price_per_meter` VARCHAR(45) NULL,
  `sep_entrance` VARCHAR(45) NULL,
  `date` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `addr_metro` VARCHAR(45) NULL,
  PRIMARY KEY (`obj_id`))
ENGINE = MyISAM;

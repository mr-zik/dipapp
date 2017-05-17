DROP TABLE IF EXISTS `testnodedb`.`houses_rent` ;

CREATE TABLE IF NOT EXISTS `testnodedb`.`houses_rent` (
  `obj_id` INT NOT NULL,
  `user_id` INT NULL,
  `obj_type` VARCHAR(45) NULL,
  `addr_city` VARCHAR(45) NULL,
  `addr_street` VARCHAR(45) NULL,
  `addr_object_number` VARCHAR(4) NULL,
  `addr_metro` VARCHAR(45) NULL,
  `obj_name` VARCHAR(45) NULL,
  `obj_description` VARCHAR(45) NULL,
  `obj_price` INT NULL,
  `obj_floors_number` INT NULL,
  `obj_rooms_number` INT NULL,
  `obj_year_build` DATE NULL,
  `obj_sq_common` INT NULL,
  `obj_sq_living` INT NULL,
  `obj_sq_kitchen` INT NULL,
  `obj_status` VARCHAR(45) NULL,
  `obj_from` VARCHAR(45) NULL,
  `obj_guests_number` VARCHAR(45) NULL,
  `obj_reservation` VARCHAR(45) NULL,
  `map_coord_x` VARCHAR(45) NULL,
  `map_coord_y` VARCHAR(45) NULL,
  `date` VARCHAR(45) NULL,
  `rent_time` VARCHAR(45) NULL,
  `fac_aircond` VARCHAR(45) NULL,
  `fac_dishwasher` VARCHAR(45) NULL,
  `fac_fridge` VARCHAR(45) NULL,
  `fac_furniture` VARCHAR(45) NULL,
  `fac_microwave` VARCHAR(45) NULL,
  `fac_tel` VARCHAR(45) NULL,
  `fac_tv` VARCHAR(45) NULL,
  `fac_washer` VARCHAR(45) NULL,
  `fac_wifi` VARCHAR(45) NULL,
  PRIMARY KEY (`obj_id`))
ENGINE = MyISAM;

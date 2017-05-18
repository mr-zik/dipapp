DROP TABLE IF EXISTS `mydb`.`images_flats_rent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`images_flats_rent` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `obj_id` INT NULL,
  `path` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`images_flats_sell` ;

CREATE TABLE IF NOT EXISTS `mydb`.`images_flats_sell` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `obj_id` INT NULL,
  `path` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`images_houses_rent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`images_houses_rent` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `obj_id` INT NULL,
  `path` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB;


DROP TABLE IF EXISTS `mydb`.`images_houses_sell` ;

CREATE TABLE IF NOT EXISTS `mydb`.`images_houses_sell` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `obj_id` INT NULL,
  `path` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`images_commercial_sell` ;

CREATE TABLE IF NOT EXISTS `mydb`.`images_commercial_sell` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `obj_id` INT NULL,
  `path` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`images_commercial_rent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`images_commercial_rent` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `obj_id` INT NULL,
  `path` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`images_ground_rent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`images_ground_rent` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `obj_id` INT NULL,
  `path` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB;
DROP TABLE IF EXISTS `mydb`.`images_ground_sell` ;

CREATE TABLE IF NOT EXISTS `mydb`.`images_ground_sell` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `obj_id` INT NULL,
  `path` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB;
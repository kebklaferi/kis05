-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kisdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kisdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kisdb` DEFAULT CHARACTER SET utf8 ;
USE `kisdb` ;

-- -----------------------------------------------------
-- Table `kisdb`.`brand`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kisdb`.`brand` ;

CREATE TABLE IF NOT EXISTS `kisdb`.`brand` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alias` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kisdb`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kisdb`.`category` ;

CREATE TABLE IF NOT EXISTS `kisdb`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alias` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kisdb`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kisdb`.`product` ;

CREATE TABLE IF NOT EXISTS `kisdb`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alias` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `brand_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_brand_idx` (`brand_id` ASC) VISIBLE,
  INDEX `fk_product_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_brand`
    FOREIGN KEY (`brand_id`)
    REFERENCES `kisdb`.`brand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `kisdb`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kisdb`.`ingredient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kisdb`.`ingredient` ;

CREATE TABLE IF NOT EXISTS `kisdb`.`ingredient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alias` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `acne_fighting` TINYINT(1) NOT NULL,
  `comedogenic_rating` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kisdb`.`product_has_ingredient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kisdb`.`product_has_ingredient` ;

CREATE TABLE IF NOT EXISTS `kisdb`.`product_has_ingredient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ingredient_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  INDEX `fk_product_has_ingredient_ingredient1_idx` (`ingredient_id` ASC) VISIBLE,
  INDEX `fk_product_has_ingredient_product1_idx` (`product_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_product_has_ingredient_ingredient1`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `kisdb`.`ingredient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_ingredient_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `kisdb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

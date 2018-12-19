DROP DATABASE IF EXISTS LOGCON;

CREATE DATABASE LOGCON;
USE LOGCON;

CREATE TABLE Users(
    ID VARCHAR(100) NOT NULL PRIMARY KEY,
    PW VARCHAR(100),
    SCORE INT DEFAULT 0,
    SCHOOL VARCHAR(100),
    EMAIL VARCHAR(100),
    FLAG INT DEFAULT 0,
    PROFILE_COMMENT VARCHAR(100) DEFAULT "undefined",
    AUTHKEY VARCHAR(100)
);

CREATE TABLE Problems(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    TITLE VARCHAR(100) NOT NULL,
    CONTENTS VARCHAR(1000) NOT NULL,
    SCORE INT NOT NULL,
    ANSWER VARCHAR(100) NOT NULL 
);

CREATE TABLE Solved(
    User VARCHAR(100) NOT NULL,
    PID INT NOT NULL PRIMARY KEY
);

CREATE TABLE Notice(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    TITLE VARCHAR(100) NOT NULL,
    CONTENTS VARCHAR(1000) NOT NULL,
    TIME VARCHAR(100) NOT NULL
);
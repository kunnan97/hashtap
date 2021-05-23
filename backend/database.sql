CREATE DATABASE uq_database;

CREATE TABLE Test (
	id SERIAL PRIMARY KEY,
	description VARCHAR (255)
);


create extension if not exists "uuid-ossp";
--set extention
CREATE TABLE TestUsers (
	user_id uuid PRIMARY KEY DEFAULT
	uuid_generate_v4(),
	user_name VARCHAR(255) NOT NULL,
	user_email VARCHAR(255) NOT NULL,
	user_password VARCHAR(255) NOT NULL
);
create database aos_db character set utf8mb4 COLLATE utf8mb4_unicode_ci;
use aos_db;

create table tbl_user(
   int_id int auto_increment primary key,
    vch_email varchar(100) not null,
    vch_password varchar(255) not null,
    vch_name varchar(100) not null,
    vch_lastname varchar(100) not null,
    int_created_by int null,
    int_updated_by int null,
    dat_deleted_at datetime null,
    foreign key (int_created_by) references tbl_user(int_id),
    foreign key (int_updated_by) references tbl_user(int_id)
);

create table tbl_product(
    int_id int auto_increment primary key,
    vch_description varchar(3000) not null,
    int_stock int not null,
    dec_weight_in_grams decimal(10,2) not null,
    dec_price decimal(10,2) not null,
    dat_deleted_at datetime null,
    int_created_by int not null,
    int_updated_by int null,
    foreign key (int_created_by) references tbl_user(int_id),
    foreign key (int_updated_by) references tbl_user(int_id)
);

insert into tbl_user (vch_email, vch_password, vch_name, vch_lastname) values ('c@c.com','$2b$10$tw9HLmJCQqbUtiICoDsfy.KfbnmfuvXcp6Km1aaZhYOoGAQiGl58e','cesar','contreras romero');

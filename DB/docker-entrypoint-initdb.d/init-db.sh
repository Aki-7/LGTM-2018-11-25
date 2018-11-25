#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE kotlindemo;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" kotlindemo <<-EOSQL
    BEGIN;
    create table todos (
        id serial,
        title varchar(50),
        memo varchar(50),
        timestamp int,
        until int,
        klass varchar(50),
        jsonstring varchar(100),
        flag1 boolean,
        flag2 boolean,
        flag3 boolean,
        flag4 boolean,
        flag5 boolean
    );

    insert into todos(id,title,memo,timestamp,until,klass,jsonstring,flag1,flag2,flag3,flag4,flag5) 
    values (0,'create todo app', 'I dont have enough time',123,456,'class','json',true,true,true,true,true);

    COMMIT;
EOSQL
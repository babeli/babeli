#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE development;
    GRANT ALL PRIVILEGES ON DATABASE development TO babeli;
EOSQL
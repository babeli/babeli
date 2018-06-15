#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE profiling;
    GRANT ALL PRIVILEGES ON DATABASE profiling TO babeli;
EOSQL
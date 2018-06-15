FROM postgres:9

ADD docker-entrypoint-initdb.d/* /docker-entrypoint-initdb.d/
ENV PGDATA /data
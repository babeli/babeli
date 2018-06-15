
cat <<EOT >> /var/lib/postgresql/data/postgresql.conf
fsync = off
full_page_writes = off
work_mem = 512MB
synchronous_commit = off
EOT

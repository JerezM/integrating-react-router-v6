#!/bin/bash

# Directorio donde se encuentran los archivos SQL localmente
MIGRATIONS_DIR="migrations/"

# Obtener la lista de archivos SQL en el directorio y ordenarlos alfabéticamente
FILES=$(ls "$MIGRATIONS_DIR"/*.sql | sort)

docker exec -i practice_postgres mkdir -p /tmp/migrations

# Iterar sobre cada archivo SQL y copiarlo al contenedor antes de ejecutarlo en la base de datos
for FILE in $FILES; do
    echo "Copiando migración al contenedor: $FILE"
    docker cp "$FILE" practice_postgres:/tmp/migrations/
    echo "Ejecutando migración: $FILE"
    docker exec -i practice_postgres psql -U martin -d practice_todolist -f "/tmp/migrations/$(basename $FILE)"
    echo "Migración completada: $FILE"
done

echo "Migraciones completadas exitosamente."


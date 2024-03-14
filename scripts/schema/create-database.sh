#!/bin/bash

# Verificar si la imagen de PostgreSQL ya está presente localmente
if [[ "$(docker images -q postgres 2> /dev/null)" == "" ]]; then
    echo "La imagen de PostgreSQL no está presente. Descargando..."
    docker pull postgres
else
    echo "La imagen de PostgreSQL ya está presente. No se requiere descarga."
fi

# Crear y ejecutar el contenedor de PostgreSQL
docker run --name postgres-todolist -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -d postgres -p 5432:5432

# Esperar unos segundos para asegurar que el contenedor esté completamente ejecutado
echo "Esperando a que PostgreSQL se inicie..."
sleep 5

# Conectar al contenedor de PostgreSQL y crear la base de datos
echo "Creando la base de datos 'practice_todolist'..."
docker exec -it postgres-todolist psql -U user -c "CREATE DATABASE practice_todolist;"

echo "Base de datos 'practice_todolist' creada exitosamente."

echo "Corriendo migraciones"
./run-migrations.sh

echo "Recreando data de ejemplo"
./recreate-sample-data.sh

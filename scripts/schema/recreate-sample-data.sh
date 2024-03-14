#!/bin/bash

# Script para mockear datos de muestra en la tabla items

# Array con algunos contenidos de muestra
CONTENTS=("Comprar leche" "Hacer ejercicio" "Preparar la cena" "Llamar a Juan" "Trabajar en el proyecto")

# Iterar sobre cada contenido y realizar una inserción en la base de datos
for CONTENT in "${CONTENTS[@]}"; do
    # Insertar el contenido en la tabla items
    docker exec -i practice_postgres psql -U martin -d practice_todolist -c "INSERT INTO items (content, is_done, created_at) VALUES ('$CONTENT', false, now());"
    echo "Datos insertados para: $CONTENT"
done

echo "Datos de muestra insertados exitosamente en la tabla items."


# Estructura del Proyecto
## En la carpeta raiz se debe encontrar:
  ### Carpeta backend
    Dockerfile
    package.json
    server.js
  ### Carpeta fronend
    app.js
    index.html
    style.css
  ### .env
  ### docker-compose.yml
  ### enunciado.txt
  ### readme.md

  # SERVICIOS
El proyecto está compuesto por 3 servicios, estos son: **database** **backend** y **frontend**

## Database
Usa el usuario y contraseña guardado en .env y la red que compartirá con el backend de
*red_interna*, sirve para proporcionar la base de datos donde el backend almacena y consulta tareas
Expone el puerto 5432 y usa la imagen postgres:16-alpine
### Variables
  -POSTGRES_USER
  -POSTGRES_PASSWORD
  -POSTGRES_DB
Y el volúmen **postgres-data**

## Backend
Hacemos el build desde su carpeta para ejecutar el Dockerfile y usamos las credenciales de .env para el usuario
y el puerto...
La usamos para hacer de puente de comunicación entre el front y la base de datos (API) y lo hace a través de la 
*red_interna*
Expone el puerto 4000 y usa la imagen node:22-alpine
### Variables
  -DB_HOST
  -DB_PORT
  -POSTGRES_USER
  -POSTGRES_PASSWORD
  -POSTGRES_DB
  -BACKEND_PORT

## Frontend 
Muestra los archivos estáticos del frontend (html,css,js..) usando Nginx
Usamos la red por defecto ya que no debe de comunicarse directamente con la database
Expone el puerto 8080:80
Usamos un volúmen **bind mount** "./frontend:/usr/share/nginx/html:ro"

# TABLA DE PUERTOS EXPUESTOS

  **SERVICIO**    **PUERTO INTERNO**    **PUERTO EXTERNO**    **DESCRIPCIÓN**
  Database               5432                  n/a              No expuesto al host
  Backend                4000                  4000             API REST
  Frontend                80                   8080             Página Web


# CONFIGURACIÓN DEL ARCHIVO .ENV
Se debe crear un archivo en la raiz del proyecto con este contenido:

  POSTGRES_USER=todouser
  POSTGRES_PASSWORD=todopass
  POSTGRES_DB=tododb
  DB_HOST=database
  DB_PORT=5432
  BACKEND_PORT=4000

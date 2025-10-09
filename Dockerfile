FROM nginx:alpine

# Actualiza los paquetes para reducir vulnerabilidades
RUN apk update && apk upgrade

#Se copia la configuración personalizada de nginx
#y los archivos estáticos del proyecto
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY personal/ /usr/share/nginx/html/
COPY presentacion/ /usr/share/nginx/html/presentacion/

#Se asignan los permisos necesarios a los archivos
RUN chmod -R 755 /usr/share/nginx/html
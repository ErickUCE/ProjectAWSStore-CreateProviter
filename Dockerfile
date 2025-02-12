# Usar la imagen base oficial de Node.js
FROM node:22.12.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

RUN apt-get update && apt-get install -y default-mysql-client

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer los puertos del servidor REST y GraphQL
EXPOSE 5000 4000

# Definir la variable de entorno para producción
ENV NODE_ENV=production

# Comando para iniciar el servicio
CMD ["node", "src/server.js"]
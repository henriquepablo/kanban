# Usar a imagem oficial do Node.js como base
FROM node:18

# Instalar o Git
RUN apt-get update && apt-get install -y git

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante da aplicação
COPY . .

# Build da aplicação
RUN npm run build

# Expôr a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

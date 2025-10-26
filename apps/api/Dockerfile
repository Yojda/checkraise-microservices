FROM node:20-alpine

# Crée un dossier app
WORKDIR /app

# Copie package.json + package-lock.json si existant
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY . .

# Expose le port
EXPOSE 4000

# Commande de lancement
CMD ["npm", "start"]

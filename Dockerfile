FROM node:18-alpine

#Telling docker to create a directory 'app'
WORKDIR /app 

#COPY package.json from current directory to working directory(/app)
COPY package*.json ./

#RUN npm install on /app
RUN npm install

#COPY all other files from current directory to /app
COPY . .

#Document working port for react-app
EXPOSE 5173

#Command to run react-app
CMD ["npm", "run", "dev"]
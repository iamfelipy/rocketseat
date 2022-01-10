#imagem
# qual imagem quero baixar
FROM node

#local onde os dados da imagem vão ser salvos
WORKDIR /usr/src/app

COPY package*.json ./

# nem todas as imagens vem com yarn instalado
# por isso usei npm
RUN npm install

RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

COPY . .

# diz que porta vai rodar
EXPOSE 3333

# executa o comando para rodar o projeto
CMD [ "npm", "run", "dev"]

#o comando abaixo vai mostrar em qual ip o container está rodando
#docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rentx
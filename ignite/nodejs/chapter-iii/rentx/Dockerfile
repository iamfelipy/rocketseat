#imagem
# qual imagem quero baixar
FROM node

#local onde os dados da imagem vão ser salvos
WORKDIR /usr/app

# vai copiar da pasta atual para o workdir
COPY package.json ./

# nem todas as imagens vem com yarn instalado
# por isso usei npm
RUN npm install

COPY . .

# diz que porta vai rodar
EXPOSE 3333

# executa o comando para rodar o projeto
CMD ["npm", "run", "dev"]

#comando para verificar ip da maquina do docker e a minha
#docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rentx
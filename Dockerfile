FROM node:18

WORKDIR /app

ENV OPENAI_API_KEY=""
ENV PUBLIC_MAPBOX_TOKEN=""

COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run prepare
RUN npm run build

EXPOSE 3000

CMD [ "node", "-r", "dotenv/config", "build" ]

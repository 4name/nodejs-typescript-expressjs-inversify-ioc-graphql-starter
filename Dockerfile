FROM node:latest

ARG PORT
ARG ENVIRONMENT

ENV PATH "./node_modules/.bin:$PATH"
ENV PORT ${PORT}
ENV NODE_ENV ${ENVIRONMENT}

RUN update-ca-certificates -f

COPY . /starter
COPY .env.${ENVIRONMENT} /starter/.env

WORKDIR /starter

RUN yarn install --${ENVIRONMENT}

CMD ["yarn","run", "serve"]

EXPOSE ${PORT}

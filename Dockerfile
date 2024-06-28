FROM node:18.17.0

ARG web=/opt/workspace/dapp
ARG NEXT_PUBLIC_NETWORK_ENV
ARG NEXT_PUBLIC_WEBSITE_NAME

WORKDIR ${web}

COPY . ${web}

RUN yarn \
    && yarn build

ENTRYPOINT yarn start

EXPOSE 3000

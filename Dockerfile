FROM node:18.17.0

ARG web=/opt/workspace/dapp
ARG NEXT_PUBLIC_NETWORK_ENV
ARG NEXT_PUBLIC_WEBSITE_NAME

ENV NEXT_PUBLIC_NETWORK_ENV=${NEXT_PUBLIC_NETWORK_ENV}
ENV NEXT_PUBLIC_WEBSITE_NAME=${NEXT_PUBLIC_WEBSITE_NAME}

WORKDIR ${web}

COPY . ${web}

RUN yarn && \ 
    if [ "$NEXT_PUBLIC_NETWORK_ENV" = "mainnet" ]; \
    then yarn build:pro;\ 
    elif [ "$NEXT_PUBLIC_NETWORK_ENV" = "dev" ]; \
    then yarn build:dev; \
    fi

ENTRYPOINT yarn start

EXPOSE 3000

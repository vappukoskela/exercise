##
# Production Dockerfile
##

###
# Base image declaration
###
FROM node:18.10-alpine AS base

ENV APPDIR /app

WORKDIR ${APPDIR}

# Copy both shared and server package files
COPY server ./server
COPY shared ./shared

# Install shared first
WORKDIR ${APPDIR}/shared
RUN npm ci && npm run build

# ###
# # Server build stage
# ###
FROM node:18.10-alpine as server-build

ENV APPDIR /app
WORKDIR ${APPDIR}

COPY --from=base ${APPDIR}/shared ./shared
COPY --from=base ${APPDIR}/server ./server
COPY --from=base ${APPDIR}/shared/dist ./shared/dist

WORKDIR ${APPDIR}/server
RUN npm ci

RUN npm run build

# ###
# # Client build stage
# ###
FROM node:18.10-alpine as client-build

ENV APPDIR /app
WORKDIR ${APPDIR}/client

COPY client/package*.json ./
RUN npm ci

COPY client ./
RUN npm run build

# ###
# # Main image build
# ###
FROM node:18.10-alpine as main

ENV APPDIR /app
WORKDIR ${APPDIR}/server

# Copy built server and node_modules
COPY --from=server-build ${APPDIR}/server/dist ./dist
COPY --from=server-build ${APPDIR}/server/node_modules ./node_modules
COPY --from=server-build ${APPDIR}/server/package*.json ./
COPY --from=server-build ${APPDIR}/server/tsconfig.json ./tsconfig.json

# Copy built client
COPY --from=client-build ${APPDIR}/client/dist ./static

# Copy migrations 
COPY --from=server-build ${APPDIR}/server/db_migrations ./db_migrations
COPY --from=server-build /app/shared/dist ./dist/shared

ENV TZ=Europe/Helsinki

EXPOSE 8080
CMD npm start
# CMD npm run db-migrate:prod && npm start

# WORKDIR ${APPDIR}/shared

# COPY shared/package*.json ./
# RUN npm ci

# COPY shared ./
# RUN npm run build


# ###
# # Server build stage
# ###
# FROM base AS server-build

# WORKDIR ${APPDIR}/server

# COPY server/package*.json ./
# RUN npm install
# RUN npm ci

# COPY server ./
# RUN npm run build
# RUN rm -r src
# ###
# # Client build stage
# ###

# FROM base AS client-build

# WORKDIR ${APPDIR}/client

# COPY client/package*.json ./
# RUN npm ci

# COPY client ./
# RUN npm run build

# ###
# # Main image build
# ###
# FROM base AS main

# WORKDIR ${APPDIR}/server

# COPY --from=server-build ${APPDIR}/server ./
# COPY --from=client-build ${APPDIR}/client/dist ./static

# ENV TZ=Europe/Helsinki

# CMD npm run db-migrate:prod && npm start

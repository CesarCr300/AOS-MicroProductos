# Use a smaller base image
FROM node:21.6.1-alpine AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn build

# Start a new stage
FROM node:21.6.1-alpine

WORKDIR /usr/src/app

# Copy only the built app from the first stage
COPY --from=build /usr/src/app/dist ./dist
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile && yarn cache clean

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
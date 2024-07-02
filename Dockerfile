# Use a smaller base image
FROM node:21.6.1-alpine AS build

ARG ISRGROOTX_CONTENT

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Bundle app source
COPY . .

RUN echo "$ISRGROOTX_CONTENT" | base64 -d > isrgrootx.pem

# Build the app
RUN yarn build

# Start a new stage
FROM node:21.6.1-alpine

WORKDIR /usr/src/app

# Copy only the built app from the first stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/isrgrootx.pem isrgrootx.pem
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Expose the app's port
EXPOSE 3000

# Start the app
CMD [ "yarn", "start:prod" ]
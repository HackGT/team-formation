FROM node:10-alpine

# Bundle Source
RUN mkdir -p /usr/src/team-formation
WORKDIR /usr/src/team-formation
COPY . /usr/src/team-formation
RUN npm install --unsafe-perm

# Set Timezone to EST
RUN apk add tzdata
ENV TZ="/usr/share/zoneinfo/America/New_York"

FROM node:10-alpine
COPY --from=0 /usr/src/team-formation/server/ /usr/src/team-formation/server/
COPY --from=0 /usr/src/team-formation/client/ /usr/src/team-formation/client/
WORKDIR /usr/src/team-formation
EXPOSE 3000
CMD ["node", "server/build/app.js"]
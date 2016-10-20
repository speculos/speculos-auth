# speculos-auth docker image
FROM node:6.8-slim

# TODO user and group

# Update and install dependencies
RUN set -x \
  && apt-get update -y \
  && apt-get install --no-install-recommends -y build-essential python \
	&& apt-get clean \
	&& apt-get autoremove -y \
	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set timezone
ENV TZ=Europe/Paris
RUN set -x \
  && echo $TZ | tee /etc/timezone \
  && dpkg-reconfigure --frontend noninteractive tzdata

# Set work dir
WORKDIR /app

# Create defaults folders
RUN set -x \
  && mkdir -p config, keys, logs

# Install node modules
COPY package.json ./
RUN set -x \
  && npm install --unsafe-perm \
  && npm install --unsafe-perm -g nodemon \
	&& npm cache clean

# Copy sources
COPY lib/ ./lib
COPY tools/ ./tools

# Port
EXPOSE 80

# Command
CMD ["node", "."]

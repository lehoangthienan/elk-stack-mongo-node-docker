FROM ubuntu:16.04

ENV TRANSPORTER_VERSION 0.5.2
ENV TRANSPORTER_PLATFORM linux-amd64
ENV TRANSPORTER_DOWNLOAD_URI https://github.com/compose/transporter/releases/download/v${TRANSPORTER_VERSION}/transporter-${TRANSPORTER_VERSION}-${TRANSPORTER_PLATFORM}

ENV DB_NAME db
ENV MONGODB_URI mongodb://host.docker.internal:27017
ENV ELASTICSEARCH_URI http://elastic:pass@host.docker.internal:9200

## install
RUN apt-get update && \
	apt-get install -y \
		curl \
        sudo \
        netcat \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

RUN curl --verbose -SL -o /usr/local/bin/transporter "${TRANSPORTER_DOWNLOAD_URI}" && \
  chmod +x /usr/local/bin/transporter

COPY ./pipeline.js . 
RUN chmod 744 ./pipeline.js

CMD ["transporter", "run", "pipeline.js"]

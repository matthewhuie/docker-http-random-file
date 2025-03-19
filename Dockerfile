FROM alpine:latest

ARG FILE_SIZES_MB="1 10 100 1000 10000"

RUN apk add --no-cache --update npm && \
    npm install http-server -g

RUN mkdir -p /tmp/docker-http-random-file && \
    for i in ${FILE_SIZES_MB}; do dd if=/dev/urandom of=/tmp/docker-http-random-file/random-"$i"MB bs=1M count="$i"; done

EXPOSE 80/tcp

ENTRYPOINT ["http-server", "/tmp/docker-http-random-file", "-p 80"]

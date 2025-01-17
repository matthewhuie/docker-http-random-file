FROM alpine:latest

RUN apk add --no-cache --update npm && \
    npm install http-server -g

RUN mkdir -p /tmp/docker-http-random-file && \
    for i in 1 10 100 1000 1000 10000; do dd if=/dev/urandom of=/tmp/docker-http-random-file/random-"$i"MB bs=1M count="$i"; done

EXPOSE 8080/tcp

ENTRYPOINT ["http-server", "/tmp/docker-http-random-file"]

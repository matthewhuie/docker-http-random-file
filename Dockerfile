FROM alpine:latest

RUN apk add --no-cache --update npm && \
    npm install http-server -g

RUN mkdir -p /tmp/docker-http-random-file && \
    dd if=/dev/urandom of=/tmp/docker-http-random-file/random-1MB bs=1MB count=1 && \
    dd if=/dev/urandom of=/tmp/docker-http-random-file/random-10MB bs=1MB count=10 && \
    dd if=/dev/urandom of=/tmp/docker-http-random-file/random-100MB bs=1MB count=100 && \
    dd if=/dev/urandom of=/tmp/docker-http-random-file/random-1GB bs=100MB count=10 && \
    dd if=/dev/urandom of=/tmp/docker-http-random-file/random-10GB bs=100MB count=100

EXPOSE 8080/tcp

ENTRYPOINT ["http-server", "/tmp/docker-http-random-file"]

FROM alpine:latest

RUN apk add --no-cache --update npm && \
    npm install http-server -g

RUN dd if=/dev/urandom of=test.random bs=1M count=4096

EXPOSE 8080/tcp

ENTRYPOINT ["http-server"]

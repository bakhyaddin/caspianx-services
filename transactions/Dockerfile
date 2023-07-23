FROM node:16.10.0-alpine

USER root
SHELL ["/bin/sh", "-o", "pipefail", "-c"]

# create work directory
WORKDIR /opt/app-root/transactions
COPY . .

# install packages
RUN chgrp -R 0 ./ \
  && chmod -R g=u ./ \
  && chmod +x ./docker-entrypoint.sh \
  && yarn install

USER 1001

CMD ["./docker-entrypoint.sh"]
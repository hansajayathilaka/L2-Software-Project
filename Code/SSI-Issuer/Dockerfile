FROM python:3.6 as base

ENV PYTHONUNBUFFERED=1

RUN apt update

WORKDIR /app

USER root

RUN useradd -ms /bin/bash user
# RUN addgroup -S user && adduser -S user -G user
RUN chown -R user:user /app
RUN chmod 755 /app
RUN mkdir -p /app/asset_files
RUN chown -R user:user /app/asset_files
RUN chmod 755 /app/asset_files

COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

USER user

COPY --chown=user:user . /app

FROM base as local

USER root
CMD python manage.py runserver 0.0.0.0:8080

FROM base as prod

WORKDIR /app

USER root
RUN chmod a+x entrypoint.sh
# USER user

CMD ./entrypoint.sh

FROM base as migrations

CMD python manage.py migrate

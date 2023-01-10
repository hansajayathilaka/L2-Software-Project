FROM python:3.6 as base

ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt update

COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY . /app

USER root

RUN useradd -s /bin/bash user
# RUN addgroup -S user && adduser -S user -G user
RUN chown -R user:user /app
RUN mkdir -p /app/asset_files && chmod -R 777 /app/asset_files
RUN chown -R user:user /app/asset_files

USER user

FROM base as local

USER root
CMD python manage.py runserver 0.0.0.0:7070

FROM base as prod

WORKDIR /app

USER root
RUN chmod a+x entrypoint.sh
USER user

RUN ls -l
CMD ./entrypoint.sh

FROM base as migrations

CMD python manage.py migrate

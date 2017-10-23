FROM python:2.7.13

ADD docker/requirements.txt /app/local/install/requirements.txt
RUN pip install --no-cache-dir -r /app/local/install/requirements.txt

WORKDIR /app/local/api
CMD FLASK_APP=app.py flask run --host=0.0.0.0
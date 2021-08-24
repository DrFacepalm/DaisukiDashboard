# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR .

# Install Python dependencies
COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

# Make port 8000 available for the app
EXPOSE 4433

COPY . .

ENV FLASK_ENV development

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it

CMD [ "python3", "wsgi.py" ]
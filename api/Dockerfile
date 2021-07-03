# Use an official Python runtime as a parent image
FROM python:3.8

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /api

# Install Python dependencies
# COPY requirements.txt /api
# RUN pip3 install --upgrade pip -r requirements.txt
RUN pip3 install pipenv
COPY Pipfile Pipfile.lock /api/
RUN pipenv install --system

# Add the rest of the code
COPY . /api/

# Make port 8000 available for the app
EXPOSE 4433

ENV MONGO_URL mongodb://mongo_user:this_is_a_safe_password@0.0.0.0:27017/ 
ENV FLASK_APP endpoints.py 
ENV FLASK_ENV development

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
CMD pipenv run python -m flask run --port 4433 --host 0.0.0.0
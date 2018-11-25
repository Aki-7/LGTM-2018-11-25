FROM python:3.6.5

ARG project_dir=/app/

# ADD requirements.txt $project_dir
ADD app.py $project_dir

WORKDIR $project_dir

RUN pip install flask requests
# RUN pip install -r requirements.txt

CMD ["python", "app.py"]

# "flask_server" image
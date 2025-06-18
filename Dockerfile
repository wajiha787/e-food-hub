FROM selenium/standalone-chrome:latest

WORKDIR /app

RUN apt-get update && apt-get install -y python3 python3-pip

COPY . /app

RUN pip3 install -r requirements.txt

CMD ["python3", "tests/test_backend_products.py"]


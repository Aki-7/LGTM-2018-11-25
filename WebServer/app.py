import os
from flask import Flask, jsonify, request, send_file, abort
import requests
from time import sleep
cpath = os.getcwd()
app = Flask(__name__,static_folder=cpath+"/static/",static_url_path="")

@app.route("/ocrclient",methods=['GET'])
@app.route("/ocrclient/upload",methods=['GET'])
@app.route("/ocrclient/revision/<string:id>")
def root(id = None):
    return send_file("./static/index.html",mimetype='text/html')

@app.route("/", methods=['GET'])
def index():
    return send_file("static/index.html",mimetype='text/html')

@app.route("/get",methods=['GET'])
def get():
    r = requests.get("http://apiserver:8080/todo")
    ret = jsonify(r.text)
    return ret

@app.route("/post", methods=['POST'])
def post():
    requests.post("http://apiserver:8080/todo")
    return "ok"


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)
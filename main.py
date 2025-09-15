from flask import Flask

app = Flask(__name__)

@app.route("/")
def undex():
    return '<h1 style ="color:blue">你好呀!Flask<h1>'
@app.route("/name")
def name():
    return '<h1>你好呀!Flask<h1>'
if __name__ == "__main__":
    app.run(debug=True)
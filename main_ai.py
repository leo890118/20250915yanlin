#todo:請建立一個Flask應用程式，並在根路由('/')回傳"Hello, Flask!"字串。
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
    

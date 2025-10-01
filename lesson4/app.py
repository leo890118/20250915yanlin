from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<h1>Hello, World!</h1>"

def main():
    """啟動應用(教學用:啟用debug模式)"""
    # 再開發環境下使用 debug=True,部署時請關閉
    app.run(debug=True)


if __name__ == "__main__":
    main()
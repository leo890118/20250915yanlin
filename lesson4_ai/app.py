"""
app.py
主程式：Flask 網頁伺服器，根路徑對應 index.html
"""
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    """首頁路由，回傳 index.html"""
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)

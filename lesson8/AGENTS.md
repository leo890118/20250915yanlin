<<<<<<< HEAD
## Lesson 5: Flask 專案介紹
=======
## Lesson 6: Flask 專案介紹
>>>>>>> 3ec8829d9406606a570eb7bce9756ae249839fdb

這是一個使用 Python Flask 框架建立的基礎網頁應用程式。

### 專案結構

```
<<<<<<< HEAD
/lesson5
=======
/lesson6
>>>>>>> 3ec8829d9406606a570eb7bce9756ae249839fdb
├── app.py              # Flask 應用程式主檔案
├── static/             # 存放靜態檔案
│   ├── css/
│   └── js/
├── templates/          # 存放 HTML 樣板
└── requirements.txt    # 專案依賴套件
```

### 環境設定與執行

本專案使用 `uv` 進行虛擬環境與套件管理。

1.  **安裝依賴**: `uv add 套件名稱`
<<<<<<< HEAD
2.  **執行專案**: `uv run python ./lesson5/app.py`
=======
2.  **執行專案**: `uv run python ./lesson6/app.py`
>>>>>>> 3ec8829d9406606a570eb7bce9756ae249839fdb

### 開發規範

*   Flask 網頁樣版請放置於 `templates` 資料夾。
*   CSS, JavaScript, 圖片等靜態檔案請放置於 `static` 資料夾。
*   請避免在 HTML 中使用行內樣式(inline style)，應將 CSS 規則統一寫在對應的 `.css` 檔案中。
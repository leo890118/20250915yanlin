import requests

def download_youbike_data()->list:
    url = 'https://data.ntpc.gov.tw/api/datasets/010e5b15-3823-4b20-b401-b1cf000550c5/json?page=0&size=1000'

    try:
        response = requests.get(url)
        response.raise_for_status()
        try:
            data = response.json()
        except requests.exceptions.JSONDecodeError as jsonError:
            print(f"發生轉換格式錯誤:jsonError")
    except requests.exceptions.HTTPError as err_http:
        print(f"發生 HTTP 錯誤: {err_http}")
    except requests.exceptions.ConnectionError as err_conn:
        print(f"發生連線錯誤 (例如 DNS 查詢失敗、連線被拒): {err_conn}")
    except requests.exceptions.Timeout as err_timeout:
        print(f"請求超時: {err_timeout}")
    except requests.exceptions.RequestException as err:
        # 這是所有 requests 例外的父類別，可以用來捕捉其他未預期的錯誤
        print(f"發生未預期的請求錯誤: {err}")
    else:
        return data

def main():
   data = download_youbike_data()
   print(data)

if __name__ == "__main__":
    main()
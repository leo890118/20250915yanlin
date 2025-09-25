import tools

def main():
    try:
        data = tools.download_youbike_data()
        areas = tools.get_area(data)
        print(areas)
    except Exception as e:
        print("發生錯誤\n{e}")
    
   

if __name__ == "__main__":
    main()
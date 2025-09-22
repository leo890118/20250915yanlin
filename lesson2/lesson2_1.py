def add(a, b):
    """加法函數，回傳 a + b"""
    result = a + b
    return result

def main():
    x = 10
    y = 20
    print("開始加法運算")
    sum_result = add(x, y)  #呼叫add()
    print(f"{x} + {y} = {sum_result}")

if __name__ == "__main__":
    main()   #呼叫main function
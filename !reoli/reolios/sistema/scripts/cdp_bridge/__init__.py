import requests

def test():
    print("Testando endpoints do Reoli CDP AI Bridge...")
    try:
        r = requests.get("http://127.0.0.1:8765/api/status")
        print("Status:", r.status_code)
    except Exception as e:
        print("Servidor aguardando inicialização.")

if __name__ == "__main__":
    test()

from app import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4433, ssl_context='adhoc')

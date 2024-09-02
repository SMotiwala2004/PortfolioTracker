import robin_stocks.robinhood as r
from flask import Flask, jsonify, request

app = Flask(__name__)

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    try:
        #login with given user credentials.
        r.login(username=data['username'], password=data['password'])
        # Check if the login was successful or not
        if r.build_user_profile():
            return jsonify({"status": f"Welcome, {data['username']}!"}), 200
        else:
            return jsonify({"status": "Login Failed"}), 401
    except Exception as e:
        # Debug print line
        print({e})
        # Internal error check
        return jsonify({"status": "An error occurred during login"}), 500

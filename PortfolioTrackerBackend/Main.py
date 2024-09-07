import robin_stocks.robinhood as r
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    try:
        login_response = r.login(username=data['username'], password=data['password'], store_session=False, by_sms=False)
        profile = r.get_all_watchlists()

        # Debug prints
        print(f"Login response: {login_response}")
        print(f"User profile: {profile}")

        if profile and login_response:
            return jsonify({"status": f"Welcome, {data['username']}!"}), 200
        else:
            return jsonify({"status": "Login Failed"}), 401
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"status": "An error occurred during login"}), 500


@app.route('/watchlists', methods=['GET'])
def loadWatchlists():
    try:
        watchlists = r.get_all_watchlists()
        # Ensure response includes the 'results' key
        response_data = {'results': watchlists}
        return jsonify(response_data), 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"status": "An error occurred while fetching watchlists"}), 500


@app.route('/logout', methods=['POST'])
def logout():
    try:
        r.logout()
        return jsonify({"status": "Logged out successfully"}), 200
    except Exception as e:
        print(f"Logout exception: {e}")
        return jsonify({"status": "An error occurred during logout"}), 500

if __name__ == '__main__':
    app.run(debug=True)

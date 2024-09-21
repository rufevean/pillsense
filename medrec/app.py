from flask import Flask, request, jsonify
from flask_cors import CORS
from notebook_importer import import_notebook_function

# Import the get_recommendations function from the notebook
get_recommendations = import_notebook_function('main.ipynb', 'get_recommendations')

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    medicine_name = data.get('medicineName')
    recommendations = get_recommendations(medicine_name, k=15)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Ensure the port is 5001
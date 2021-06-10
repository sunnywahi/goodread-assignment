from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import os
import json
from books_data import BooksData

app = Flask(__name__)
CORS(app)
SITE_ROOT = os.path.realpath(os.path.dirname(__file__))

books = BooksData(os.path.join(SITE_ROOT, "data", "goodreads_books.zip"))


@app.route('/questions/', methods=['GET'])
def questions():
    json_url = os.path.join(SITE_ROOT, "data", "questions.json")
    data = json.load(open(json_url))
    return jsonify(data)


@app.route('/loadData/', methods=['GET', 'POST'])
def pandas_json():
    page = request.args.get('page', 0, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    search = request.args.get('search', '', type=str)
    if bool(search):
        return jsonify(books.load_books_with_criteria(page, per_page, search))
    else:
        return jsonify(books.load_data(page, per_page))


@app.route('/info/', methods=['GET'])
def info():
    return jsonify(books.data_trends())


if __name__ == '__main__':
    app.run(host='localhost', port=8090)

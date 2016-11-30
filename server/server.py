from flask import Flask, request, jsonify, send_file, Response

import os
import parse

app = Flask(__name__, static_url_path='', static_folder='public')

@app.route('/course-ad', methods=['GET'])
def get_ad_classes():
  return jsonify(parse.get_courses())

if __name__ == '__main__':
  app.run(port=2525, debug=True)

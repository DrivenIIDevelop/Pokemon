from flask import Flask

app = Flask(__name__)

from expenses import routes
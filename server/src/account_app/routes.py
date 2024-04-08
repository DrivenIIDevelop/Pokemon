from account_app import app
from flask import jsonify

@app.route("/")
@app.route("/home")
def home():
	return jsonify({ 'title': 'Homepage' })

@app.route("/account")
def account():
	return "<h1>Account Page</h1>"

@app.route("/login")
def login():
	return "<h1>Login Page</h1>"

@app.route("/about")
def about():
	return "<h1>About Page</h1>"

from flask import Flask, request, jsonify
from accounts import app
from dotenv import load_dotenv
from pathlib import Path
from os import getenv
import os 
import plaid
from plaid.api import plaid_api
from plaid.model.products import Products


MODE = getenv('MODE', 'development')
dotenv_path = Path('../.env.' + MODE)
load_dotenv(dotenv_path=dotenv_path)

f_debug = True # global flag for debugging 

#newly added plaid test code 
PLAID_CLIENT_ID = os.getenv('PLAID_CLIENT_ID')
PLAID_SECRET = os.getenv('PLAID_SECRET')
PLAID_ENV = os.getenv('PLAID_ENV', 'sandbox')
PLAID_PRODUCTS = os.getenv('PLAID_PRODUCTS', 'transactions').split(',')

def empty_to_none(field):
    value = os.getenv(field)
    if value is None or len(value) == 0:
        return None
    return value

host = plaid.Environment.Sandbox

if PLAID_ENV == 'sandbox':
    host = plaid.Environment.Sandbox

if PLAID_ENV == 'development':
    host = plaid.Environment.Development

if PLAID_ENV == 'production':
    host = plaid.Environment.Production


PLAID_REDIRECT_URI = empty_to_none('http://localhost:3000/')

configuration = plaid.Configuration(
    host=host,
    api_key={
        'clientId': PLAID_CLIENT_ID,
        'secret': PLAID_SECRET,
        'plaidVersion': '2020-09-14'
    }
)
api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)

products = []
for product in PLAID_PRODUCTS:
    products.append(Products(product))
    
access_token = None
payment_id = None
transfer_id = None
item_id = None

@app.route('/api/info', methods=['POST'])
def info():
    global access_token
    global item_id
    return jsonify({
        'item_id': item_id,
        'access_token': access_token,
        'products': PLAID_PRODUCTS
    })


@app.route('/')
def hello_world():
    return 'Hello, Backend Team! This is a plaid API test!'

def main():
	app.run(
		debug=f_debug,
		host=getenv('VITE_API_HOST'),
		port=getenv('VITE_API_PORT')
	)

if __name__ == "__main__":
	main()
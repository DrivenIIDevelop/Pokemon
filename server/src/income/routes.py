from flask import request, jsonify 
from income import app 
from income.models import db, Income

#create user account
@app.route('/income', methods=['POST'])
def create_income():
    data = request.get_json()
    new_income = Income(amount=data['amount'], date=data['date'])
    db.session.add(new_income)
    db.session.commit()
    return jsonify({'message': 'Income created successfully'}), 201

#retrieve all user accounts
@app.route('/income', methods=['GET'])
def get_all_income():
    incomes = Income.query.all()
    result = []
    for income in incomes:
        income_data = {
            'id': income.id,
            'amount': income.amount,
            'date': income.date
        }
        result.append(income_data)
    return jsonify(result), 200

# Retrieve a single user ID 
@app.route('/income/<int:income_id>', methods=['GET'])
def get_income(income_id):
    income = Income.query.get(income_id)
    if not income:
        return jsonify({'message': 'income not found'}), 404
    income_data = {
        'id': income.id,
        'amount': income.amount,
        'date': income.date
    }
    return jsonify(income_data), 200

# Update a single user account
@app.route('/income/<int:income_id>', methods=['PUT'])
def update_income(income_id):
    income = Income.query.get(income_id)
    if not income:
        return jsonify({'message': 'income not found'}), 404
    data = request.get_json()
    income.amount = data.get('amount', income.amount)
    income.date = data.get('date', income.date)
    db.session.commit()
    return jsonify({'message': 'income updated successfully'}), 200

# Delete a user account by ID
@app.route('/income/<int:income_id>', methods=['DELETE'])
def delete_income(income_id):
    income = Income.query.get(income_id)
    if not income:
        return jsonify({'message': 'income not found'}), 404
    db.session.delete(income)
    db.session.commit()
    return jsonify({'message': 'income deleted successfully'}), 200
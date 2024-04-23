from flask import request, jsonify 
from expenses import app 
from expenses.models import db, Expenses

#create user account
@app.route('/expenses', methods=['POST'])
def create_expenses():
    data = request.get_json()
    new_expenses = Expenses(amount=data['amount'], date=data['date'])
    db.session.add(new_expenses)
    db.session.commit()
    return jsonify({'message': 'Expense created successfully'}), 201

#retrieve all user accounts
@app.route('/expenses', methods=['GET'])
def get_all_expense():
    expenses = Expenses.query.all()
    result = []
    for expense in expenses:
        expense_data = {
            'id': expense.id,
            'amount': expense.amount,
            'date': expense.date
        }
        result.append(expense_data)
    return jsonify(result), 200

# Retrieve a single user ID 
@app.route('/expenses/<int:expense_id>', methods=['GET'])
def get_expense(expense_id):
    expense = Expenses.query.get(expense_id)
    if not expense:
        return jsonify({'message': 'expense not found'}), 404
    expense_data = {
        'id': expense.id,
        'amount': expense.amount,
        'date': expense.date
    }
    return jsonify(expense_data), 200

# Update a single user account
@app.route('/expenses/<int:expense_id>', methods=['PUT'])
def update_expense(expense_id):
    expense = Expenses.query.get(expense_id)
    if not expense:
        return jsonify({'message': 'expense not found'}), 404
    data = request.get_json()
    expense.amount = data.get('amount', expense.amount)
    expense.date = data.get('date', expense.date)
    db.session.commit()
    return jsonify({'message': 'expense updated successfully'}), 200

# Delete a user account by ID
@app.route('/expense/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    expense = Expenses.query.get(expense_id)
    if not expense:
        return jsonify({'message': 'expense not found'}), 404
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'message': 'expense deleted successfully'}), 200
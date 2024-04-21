from accounts import app
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://marxia:abc123@localhost/cashdragon'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Integer, unique=True, nullable=False)  
    date = db.Column(db.DateTime, unique=True, nullable=False)
  
    
    def __repr__(self):
        return f"<User {self.amount}>"
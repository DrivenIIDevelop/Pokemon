import mongoose from 'mongoose'
import { Expense } from '../models/Expense'

interface TestExpense {
  title: string
  amount: number
  description: string
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'annually'
  date: Date
}

async function insertTestExpense() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://your_connection_string_here')

    // Test expense data
    const testExpenses: TestExpense[] = [
      {
        title: 'Netflix subscription',
        amount: 15,
        description: 'Monthly subscription',
        frequency: 'monthly',
        date: new Date('2024-04-15'),
      },
      {
        title: 'Rent',
        amount: 2000,
        description: 'Monthly apartment rent',
        frequency: 'monthly',
        date: new Date('2024-04-01'),
      },
      {
        title: 'Electric Bill',
        amount: 80,
        description: 'Electricity',
        frequency: 'monthly',
        date: new Date('2024-04-11'),
      },
      {
        title: 'Disney Plus',
        amount: 170,
        description: 'Disney streaming services',
        frequency: 'annually',
        date: new Date('2024-04-01'),
      },
      {
        title: 'Dog Walker',
        amount: 20,
        description: 'someone needs to walk the demons',
        frequency: 'weekly',
        date: new Date('2024-04-02'),
      },
    ]

    // Insert each test expense into the database
    for (const expense of testExpenses) {
      await Expense.create(expense)
    }

    console.log('Test expense inserted successfully.')
    process.exit(0) // Exit script after successful insertion
  } catch (error) {
    console.error('Error inserting test expense:', error)
    process.exit(1) // Exit script with error code
  }
}

// Run the function to insert test data
insertTestExpense()

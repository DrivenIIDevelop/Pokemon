import mongoose from 'mongoose'
import { Budget } from '../models/Budget'

interface TestBudget {
  budgetName: string
  goalAmount: number
  description: string
  goalDate: Date
  status: 'completed' | 'in progress' | 'canceled'
}

async function insertBudgetIncomes() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://your_connection_string_here')

    // Test budget data
    const testBudgets: TestBudget[] = [
      {
        budgetName: 'Tokyo plane ticket',
        goalAmount: 1000,
        description: 'plane ticket for Japan trip',
        goalDate: new Date('2024-06-01'),
        status: 'completed',
      },
      {
        budgetName: 'Japan trip',
        goalAmount: 5000,
        description: 'food, gifts, sight seeing, etc',
        goalDate: new Date('2025-09-01'),
        status: 'in progress',
      },
      {
        budgetName: 'nest egg',
        goalAmount: 10000,
        description: 'funds for a rainy day',
        goalDate: new Date('2025-06-01'),
        status: 'in progress',
      },
      {
        budgetName: 'Suzuki Hayabusa',
        goalAmount: 10000,
        description: 'vroom vroom',
        goalDate: new Date('2023-05-11'),
        status: 'canceled',
      },
      {
        budgetName: 'New Car',
        goalAmount: 10000,
        description: 'Replace old clunker',
        goalDate: new Date('2022-05-11'),
        status: 'completed',
      },
    ]

    // Insert each test budget into the database
    for (const budget of testBudgets) {
      await Budget.create(budget)
    }

    console.log('Test budget inserted successfully.')
    process.exit(0) // Exit script after successful insertion
  } catch (error) {
    console.error('Error inserting test budget:', error)
    process.exit(1) // Exit script with error code
  }
}

// Run the function to insert test data
insertBudgetIncomes()

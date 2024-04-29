import mongoose from "mongoose";
import { Income } from "../models/Income.mjs";

async function insertTestIncomes() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://marvinxia09:FKm0XWSFeaYTI8ec@cluster0.vkbcnyo.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Test incomes data
        const testIncomes = [
            { 
                title: "Salary", 
                amount: 2000, 
                description: "Monthly salary", 
                status: "approved", 
                date: new Date("2024-04-01"), 
                frequency: "monthly"
            },
            { 
                title: "Freelance Work", 
                amount: 1000, 
                description: "Project payment", 
                status: "pending", 
                date: new Date("2024-04-09"),
                frequency: "one-time"
            },
            { 
                title: "Lyft", 
                amount: 200, 
                description: "Lyft payout", 
                status: "rejected",
                date: new Date("2024-04-10"), 
                frequency:"one-time"
            },
            { 
                title: "Bi-weekly pay", 
                amount: 800, 
                description: "Bi-weekly pay", 
                status: "pending",
                date: new Date("2024-04-01"), 
                frequency: "bi-weekly"
            }
        ];

        // Insert each test income into the database
        for (const income of testIncomes) {
            await Income.create(income);
        }

        console.log("Test incomes inserted successfully.");
        process.exit(0); // Exit script after successful insertion
    } catch (error) {
        console.error("Error inserting test incomes:", error);
        process.exit(1); // Exit script with error code
    }
}

// Run the function to insert test data
insertTestIncomes();
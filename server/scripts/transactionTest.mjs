import mongoose from "mongoose";
import { Transaction } from "../models/Transactions.mjs";

async function insertTestTransaction() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://marvinxia09:FKm0XWSFeaYTI8ec@cluster0.vkbcnyo.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Test transaction data
        const testTransactions = [
            { 
                title: "Costco Hotdog", 
                amount: 2, 
                description: "Got that dog in me", 
                date: new Date("2024-04-23"), 
            },
            { 
                title: "Tonkatsu Ramen", 
                amount: 15, 
                description: "Send Noods", 
                date: new Date("2024-04-23"), 
            },
            { 
                title: "Iphone 15 Pro Max", 
                amount: 1200, 
                description: "New Iphone", 
                date: new Date("2024-04-11"), 
            },
            { 
                title: "Jordan 1 Retro ", 
                amount: 360, 
                description: "New Kicks", 
                date: new Date("2024-04-01"), 
            },
            { 
                title: "Black Airforce 1", 
                amount: 150, 
                description: "you criminal...", 
                date: new Date("2024-04-01"), 
            }
        ];

        // Insert each test transaction into the database
        for (const transaction of testTransactions) {
            await Transaction.create(transaction);
        }

        console.log("Test transaction inserted successfully.");
        process.exit(0); // Exit script after successful insertion
    } catch (error) {
        console.error("Error inserting test transaction:", error);
        process.exit(1); // Exit script with error code
    }
}

// Run the function to insert test data
insertTestTransaction();
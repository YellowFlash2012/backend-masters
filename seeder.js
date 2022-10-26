
import { readFile } from "fs/promises";

import { config } from "dotenv"
import colors from "colors"

import connectDB from "./config/db.js"
import Bootcamp from "./models/Bootcamp.js"

config()

connectDB()

// seed the db
const importData = async () => {
    try {
        await connectDB(process.env.MONGO_URI)

        await Bootcamp.deleteMany()

        const bootcamps = JSON.parse(
            await readFile(new URL("./_data/bootcamps.json", import.meta.url))
        );

        await Bootcamp.create(bootcamps);

        console.log('Data imported...'.green.inverse);

        process.exit();
    } catch (error) {
        console.log(error);
    }
}

// empty the db
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();

        console.log("Data destroyed...".red.inverse);

        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// ***commands to execute the above scripts
if (process.argv[2] === '-i') {
    //process.argv[2] refers to '-i' in node seeder.js -i 
    importData()
} else if (process.argv[2] === "-d") {
    deleteData()
}
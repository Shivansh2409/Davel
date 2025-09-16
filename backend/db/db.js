import mongoose from "mongoose";

const dbUrl = process.env.MONGODB_URI;


async function main() {
    await mongoose.connect(dbUrl);

}

export default main;
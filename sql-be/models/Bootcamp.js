import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Bootcamp = sequelize.define("Bootcamp", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: {
            type: DataTypes.GEOMETRY("Point"),
            allowNull: false,
        },
        coordinates: {
            type: DataTypes.NUMBER,
            allowNull: false,
            indexedDB: "2dsphere",
        },
        formattedAddress: DataTypes.STRING,
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        country: DataTypes.STRING,
    },
    career: {
        // array of strings
        type: DataTypes.ARRAY(
            DataTypes.ENUM(
                "Web Development",
                "Mobile Development",
                "UI/UX",
                "Data Science",
                "Business",
                "Other"
            )
        ),
        allowNull: false,
    },

    averageRating: {
        type: DataTypes.RANGE(DataTypes.INTEGER),
    },
    averageCost: {
        type:DataTypes.NUMBER
    },
    photo: {
        type: DataTypes.STRING,
        defaultValue:"no-photo.jpg"
    },
    housing: {
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    jobAssistance: {
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    jobGuarantee: {
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    acceptGi: {
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
});

Bootcamp.sync()

const range = [1, 10]

export default Bootcamp
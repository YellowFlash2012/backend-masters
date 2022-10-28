import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "A course title is required!"],
        },
        description: {
            type: String,
            required: [true, "A course description is required!"],
        },
        weeks: {
            type: String,
            required: [true, "A course duration is required!"],
        },
        tuition: {
            type: Number,
            required: [true, "A course duration is required!"],
        },
        minimumSkill: {
            type: String,
            required: [true, "A course requirement is required!"],
            enum: ["beginner", "intermediate", "advanced"],
        },
        scholarhipsAvailable: {
            type: Boolean,
            default: false,
        },
        bootcamp: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bootcamp",
            required: true,
        },
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course
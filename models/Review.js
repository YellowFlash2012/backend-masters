import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "A review title is required!"],
            maxlength:100
        },
        text: {
            type: String,
            required: [true, "A review description is required!"],
        },
        rating: {
            type: Number,
            min: 1,
            max:10,
            required: [true, "A rating between 1 and 10 is required!"],
        },
        
        bootcamp: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bootcamp",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// user can add only 1 review per bootcamp
reviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });


const Review = mongoose.model("Review", reviewSchema);

export default Review;

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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

courseSchema.statics.getAverageCost=async function (bootcampID) {
    console.log('Calculating average cost...'.blue.bold);

    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampID }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuition' }
            }
        }
    ]);
    console.log(obj);

    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampID, { averageCost: Math.ceil(obj[0].averageCost / 10) * 10 });
    } catch (error) {
        console.error(error);
    }
}

// ***call getAvgCost after save
courseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

// ***call getAvgCost before remove
courseSchema.post('remove', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

const Course = mongoose.model("Course", courseSchema);

export default Course
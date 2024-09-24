const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        text: {type: String, required: [true, "Please add a Text Value"]},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
    }, {timestamps: true}
)

module.exports = mongoose.model("Task", taskSchema)
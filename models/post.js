const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const post = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["TO LEARN", "LEARNING", "LEARNED"],
        },
        url: {
            type: String,
            required: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },

    {
        timestamps: true,
        collection: "posts",
    }
);
module.exports = mongoose.model("posts", post);

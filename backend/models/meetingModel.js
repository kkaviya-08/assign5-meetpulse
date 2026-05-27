const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({

    title: {

        type: String,

        required: [true, "Meeting title is required"],

        minlength: [3, "Title must contain at least 3 characters"]

    },

    speaker: {

        type: String,

        required: [true, "Speaker name is required"]

    },

    status: {

        type: String,

        enum: ["Pending", "Completed"],

        default: "Pending"

    },

    engagement: {

        type: Number,

        required: true,

        min: 0,

        max: 100

    },

    participation: {

        type: Number,

        required: true,

        min: 0,

        max: 100

    },

    interruptions: {

        type: Number,

        required: true,

        min: 0,

        max: 10

    },

    clarity: {

        type: Number,

        required: true,

        min: 0,

        max: 100

    },

    duration: {

        type: Number,

        required: true,

        min: 1

    }

}, { timestamps: true });

module.exports =
    mongoose.model(
        'Meeting',
        meetingSchema
    );
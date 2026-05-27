const mongoose = require('mongoose');

const Meeting =
    require('../models/meetingModel');


// CREATE MEETING
const createMeeting = async (req, res) => {

    try {

        const {

            title,
            speaker,
            engagement,
            participation,
            interruptions,
            clarity,
            duration

        } = req.body;


        // REQUIRED FIELD VALIDATION
        if (

            !title ||
            !speaker ||
            engagement === undefined ||
            participation === undefined ||
            interruptions === undefined ||
            clarity === undefined ||
            duration === undefined

        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required"

            });

        }


        const meeting =
            await Meeting.create(req.body);

        res.status(201).json({

            success: true,

            message:
                "Meeting Created Successfully",

            data: meeting

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// GET ALL MEETINGS
const getMeetings = async (req, res) => {

    try {

        const meetings =
            await Meeting.find();

        res.status(200).json({

            success: true,

            count: meetings.length,

            data: meetings

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// UPDATE MEETING
const updateMeeting = async (req, res) => {

    try {

        const id = req.params.id;


        // INVALID ID CHECK
        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid Meeting ID"

            });

        }


        const updatedMeeting =
            await Meeting.findByIdAndUpdate(

                id,

                req.body,

                {

                    new: true,

                    runValidators: true

                }

            );


        // NOT FOUND CHECK
        if (!updatedMeeting) {

            return res.status(404).json({

                success: false,

                message:
                    "Meeting Not Found"

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Meeting Updated Successfully",

            data: updatedMeeting

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// DELETE MEETING
const deleteMeeting = async (req, res) => {

    try {

        const id = req.params.id;


        // INVALID ID CHECK
        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid Meeting ID"

            });

        }


        const deletedMeeting =
            await Meeting.findByIdAndDelete(id);


        // NOT FOUND CHECK
        if (!deletedMeeting) {

            return res.status(404).json({

                success: false,

                message:
                    "Meeting Not Found"

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Meeting Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting

};
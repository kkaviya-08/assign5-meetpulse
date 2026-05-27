const express = require('express');

const router = express.Router();

const {

    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting

} = require('../controllers/meetingController');

const authMiddleware =
require('../middleware/authMiddleware');


// GET ALL

router.get(

    '/',

    authMiddleware,

    getMeetings

);


// CREATE

router.post(

    '/',

    authMiddleware,

    createMeeting

);


// UPDATE

router.put(

    '/:id',

    authMiddleware,

    updateMeeting

);


// DELETE

router.delete(

    '/:id',

    authMiddleware,

    deleteMeeting

);

module.exports = router;
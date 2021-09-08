const router = require('express').Router();
const { Submission, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const upload = require('../../utils/upload');
const remove = require('../../utils/remove')
const singleUpload = upload.single("image");
const aws = require("aws-sdk");



router.post('/', withAuth, async (req, res) => {
try {
    const newSubmission = await Submission.create({
    ...req.body,
    user_id: req.session.user_id,
    });

    res.status(200).json(newSubmission);
    } catch (err) {
    res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
try {
    const submissionData = await Submission.destroy({
    where: {
        id: req.params.id,
        //user_id: req.session.user_id,
    },
    });

    if (!submissionData) {
    res.status(404).json({ message: 'No project found with this id!' });
    return;
    }

    res.status(200).json(submissionData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middlaware");
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: (_, __, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (_, file ,cb) => {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({ storage });

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибкаю Попробуйте позже",
    });
  }
});
// router.post('/upload', auth, upload.single('image'), (req, res) => {
//     res.json({
//         url: `/uploads/${req.file.originalname}`
//     });
// });

router.get("/", auth, async (req, res) => {
  const userId = req.user._id;
  // console.log(userId);
  try {
    const list = await User.findById(userId);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибкаю Попробуйте позже",
    });
  }
});

module.exports = router;

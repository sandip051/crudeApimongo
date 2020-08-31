var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Student = require("../module/student");
const { json } = require("body-parser");

router.get("/", (req, res) => {
  res.render("student/register");
});

router.post("/student/data", async function (req, res) {
  const newstudent = new Student(req.body);
  console.log(newstudent);
  try {
    const student = await newstudent.save();
    if (!student) throw err("something wrong");
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.get("/fetch", async function (req, res) {
  try {
    const newstudent = await Student.find();
    console.log(newstudent);
    if (!newstudent) throw err("No Data Found");
    res.status(200).json(newstudent);
  } catch (error) {
    res.status(400).json({ msg: err });
  }
});

router.delete("/deleteData/:id", async function (req, res) {
  try {
    const newstudent = await Student.findByIdAndDelete(req.params.id);
    console.log(newstudent);
    if (!newstudent) throw err("No Data found");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: err });
  }
});

router.post("/update/:id", async function (req, res) {
  try {
    console.log(req.body);

    const newstudent = await Student.updateOne(
      { _id: req.params.id },
      {
        $set: {
          student_name: req.body.student_name,
          student_last: req.body.student_last,
          student_city: req.body.student_city,
        },
      },
      { upsert: true }
    );
    console.log(newstudent);
    if (!newstudent) throw err(" Data Not found");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: err });
  }
});

//   router.post('/student/Data', function(req, res, next) {
//   console.log(req.body);
//   Student.create(req.body, function (err, post) {
//     if (err) {
//       console.log(err);
//       return next(err);
//     }
//     res.json(post);
//   });
// });

// Data Delete
// router.delete('/:id', function (req, res) {
//   console.log(req.params);
//   Student.findByIdAndDelete(req.params.id,req.body,function(err,results){
// if(err) throw err;
//  res.send(json.stringify(results));
//   });
// });

// end

// data update
// router.put('/student/update:id', function(req, res, next) {
//   console.log(req.body);
//   Student.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) {
//       console.log(err);
//       return next(err);
//     }
//     res.json(post);
//   });
// });
// end

module.exports = router;

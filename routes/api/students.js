const express = require('express');
const router = express.Router();

//student model
const student = require('../../models/student.model');


//post student
router.post('/', (req,res) => {
    const newStudent = new student({
        Name : req.body.Name,
        College : req.body.College,
        Gender    : req.body.gender,
        Age : req.body.Age,
        rollNo      : req.body.rollNo,
        Branch      : req.body.Branch
        
    })
    newStudent.save()
        .then(student => res.json(student))
})



//list all students
 router.get('/', (req, res) => {
    student.find()
        .sort({ date: -1 })
        .then(student => res.json(student))
 })

//get student by id
router.get('/:id', (req,res) => {
    student.findById(req.params.id)
        .then(student => {
            if(student){
                res.json(student)
            }
            else {
                res.status(404).json({ nostudentfound: 'No student found with that ID'})
            }
    })
    .catch(err => 
        res.status(404).json({noblogfound: 'No blog found with that ID'}))
});


router.post('/:id', function (req, res) {
    let query = { _id: req.params.id }

    student.findByIdAndDelete(query, function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
            return;
        }
        else{
            res.json({msg: "success"})
        }
    });
})

// router.delete('/:id', (req,res) => {
//     student.findById(req.params.id)
//         .then(student => student.remove()
//         .then(() => res.json({success: true}))
//         )
//         .catch(err => res.status(404).json({success:false}))
// })

// router.put('/:id', (req,res) => {
//     const found = student.findByIdAndUpdate(student => student.id === parseInt(req.params.id));
//     // Campground.findByIdAndUpdate
//     // (req.params.id, req.body.campground,function(err, updatedCampground
//     if(found) {
//         const updStudent = req.body;
//         student.forEach(student => {
//             if(student.id === parseInt(req.params.id)) {
//                 student.firstName = updStudent.firstName ? updStudent.firstName : student.firstName;
//                 student.lastName = uptStudent.lastName ? updStudent.lastName : student.lastName;
//                 student.Branch = uptStudent.Branch ? updStudent.Branch : student.Branch;
//                 student.rollNo = uptStudent.rollNo ? updStudent.rollNo : student.rollNo;


//                 res.json({msg: 'student updated',  student})
//             }
//         })
//     }else{
//         res.status(400).json({msg : `No student with the id of ${req.params.id}`});
//     }
// })

router.post('/:id',  (req, res) => {

    student.findById(req.params.id, (err, student) => {
        if (!student)
            res.status(404).send("data is not found");
        else {
            student.Name = req.body.Name;
            student.Branch = req.body.Branch;
            student.College = req.body.College;
            student.rollNo = req.body.rollNo;
            student.Gender = req.body.Gender;
            student.Age = req.body.Age;
    
            student.save().then(student => {
                res.json({msg: "success"})
            })
            .catch(err => {
                res.json({msg: "falied"});
            });
        }
    });
});

module.exports = router;

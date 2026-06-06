const express = require("express");

const db = require("./database");

const app = express();

app.use(express.json());

app.use(express.static("public"));


// CREATE
app.post("/register", (req,res)=>{

    const {
        student_name,
        course_name,
        semester
    } = req.body;

    db.run(
        `
        INSERT INTO courses
        (student_name,course_name,semester)
        VALUES(?,?,?)
        `,
        [student_name,course_name,semester],

        function(err){

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Course Registered Successfully"
            });

        }
    );

});


// READ
app.get("/courses",(req,res)=>{

    db.all(
        "SELECT * FROM courses",
        [],
        (err,rows)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json(rows);

        }
    );

});


// UPDATE
app.put("/update/:id",(req,res)=>{

    const id = req.params.id;

    const {
        student_name,
        course_name,
        semester
    } = req.body;

    db.run(
        `
        UPDATE courses

        SET

        student_name=?,
        course_name=?,
        semester=?

        WHERE id=?
        `,
        [
            student_name,
            course_name,
            semester,
            id
        ],

        function(err){

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Course Updated"
            });

        }
    );

});


// DELETE
app.delete("/delete/:id",(req,res)=>{

    const id = req.params.id;

    db.run(
        `
        DELETE FROM courses
        WHERE id=?
        `,
        [id],

        function(err){

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Course Deleted"
            });

        }
    );

});



app.listen(3000,()=>{

    console.log(
        "Server Running On Port 3000"
    );

});
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("courses.db", (err) => {

    if(err){
        console.log(err.message);
    }
    else{
        console.log("Connected to SQLite Database");
    }

});

db.run(`
CREATE TABLE IF NOT EXISTS courses(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    student_name TEXT,

    course_name TEXT,

    semester TEXT

)
`);

module.exports = db;
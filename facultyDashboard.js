const refExp = require("express")
const refMysql = require("mysql2")
const bodyParser = require("body-parser")


const app = refExp()
const port = 9090
const db=refMysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "port":3306,
    "database":"mec_project"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
})

app.use(bodyParser.json());


app.listen(port,()=>{
    console.log("My app is running!!")
})

app.post('/facultyPost',async(req,res)=>{
    const {event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_number,guest_email,student_count,faculty_count,others_count,event_photo_1,event_photo_2,event_po,proposal_date,proposal_hod,proposal_principal,completion_date,completion_hod,completion_principal,pdf,approval_status,event_budget,event_coordinator,coordinator_phno,coordinator_designation,event_duration,event_os,event_time,event_description,acdyr_id,event_budget_utilized,dept_id,sem_id} = req.body
    const sql="insert into data_ecr values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    db.query(sql,[event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_number,guest_email,student_count,faculty_count,others_count,event_photo_1,event_photo_2,event_po,proposal_date,proposal_hod,proposal_principal,completion_date,completion_hod,completion_principal,pdf,approval_status,event_budget,event_coordinator,coordinator_phno,coordinator_designation,event_duration,event_os,event_time,event_description,acdyr_id,event_budget_utilized,dept_id,sem_id],(err,result)=>{
        if (err) {
            res.status(500).json({ "error": err.message })
        }
        else{
            res.status(200).json({ "message": result.affectedRows });
        }
    })
})

app.get('/facultyGet',async(req,res)=>{
    const sql="select * from data_ecr"
    db.query(sql,(err,records)=>{
        if(err){
            res.status(404).json({"error":err.message})
            return
        }
        if(records.length==0){
            res.json(201).json({"message":"no records found"})
            return
        }
        res.status(200).json({records})
    })
})

// app.put('/update',async(req,res)=>{
//     const {Rollno,Name,FG_id,Gender_id,Dept_id} = req.body
//     const sql="update student_details set Name=?, FG_id=?, Gender_id=?, Dept_id=? where Rollno=?"
//     db.query(sql,[Name,FG_id,Gender_id,Dept_id,Rollno],(err,result)=>{
//         if(err){
//             res.status(500).json({"error": err.message})
//             return
//         }
//         if(result.affectedRows==0){
//             res.status(404).json({message:"No product found"})
//             return
//         }
//         res.status(200).json({message:`${Rollno} has updated`})
//     })
// })

// app.delete('/delete/:rollno',async(req,res)=>{
//     const rollno=req.params.rollno
//     const sql="delete from Student_details where Rollno=?"
//     db.query(sql,[rollno],(err,result)=>{
//         if(err){
//             res.status(500).json({error:"Error while deleting the record"})
//             return
//         }
//         if(result.affectedRows==0){
//             res.status(404).json({message:"Product not found to delete"})
//             return
//         }
//         res.status(200).json({message:`${rollno} has removed from stock`})
//     })
// })
var promise = require('promise');
export class Student{
	constructor(){
// default constructor
      }

    insertstudent(req, res,pool) {
        var data ={}; var student_course=[];
      data.firstname=req.body.firstname;
      data.lastname=req.body.lastname;
      data.email=req.body.email;
      data.phonenumber=req.body.phonenumber;
      data.dateofjoining=req.body.dateofjoining;
      data.susername=req.body.susername;
      data.spassword=req.body.spassword;
      data.studentcourse = req.body.studentcoursedata;
        
        
       // console.log(data.studentcourse);
        
    var studentdata={
      	firstname:data.firstname,
      	lastname:data.lastname,
      	email:data.email,
      	phonenumber:data.phonenumber,
      	dateofjoining:data.dateofjoining,
        susername:data.susername,
        spassword:data.spassword
      }
     
      // db calls
      
      pool.getConnection((error,connection)=>{
      	  return new promise((resolve,reject)=>{
               if(connection){
                   connection.query('insert into studentdetails set ?',studentdata,(error,student_result)=>{
                        if(student_result){
                              resolve(student_result.insertId);
                         }else{
                            res.status(400).send(
                                {message : error}
                            );
                          }
                  })
        }else{
          res.status(400).send({
              message:error
          })
        }
         }).then((insertid)=>{
          
             for(var item of data.studentcourse){
        //  console.log(item.cid);    
      
                      student_course.push([insertid,item.cid,item.tid,item.timings,item.startdate,item.enddate]);
      
      }
             
        // console.log(student_course)    ;
             
           connection.query('insert into studentcourse (sid,cid,tid,timings,startdate,enddate) VALUES ?',[student_course],(error,studentcourse_result)=>{
            if(studentcourse_result){
              res.status(200).send({
                            message :  "student added successfully",
                            data:studentcourse_result
                           })
            }else{
                
                  res.status(503).send({message : error});   
            }
           })

         })


      })

      
      // db calls
     }
    
    
    /* GET students data */
    
    
    getStudents(req,res,pool){
        
        pool.getConnection((error,connection)=>{
            
            if(connection){
                connection.query('select * from studentdetails',(error,getresult)=>{
                    if(getresult){
                        
                        res.status(200).send({
                            message:"data fetched",
                            data: getresult
                        })
                     
                  }else{
                      
                      res.status(400).send({
                          message: "Failed in getting data ",
                          data: error
                      })
                     
                     }
                })
                
            }else{
                res.status(400).send({
                            message:error
                   })
                }
         
        })
        
        
        
    }
    
       /* GET students data */
    
    
    /* GET students by ID */
    
    
    getStudentById(req,res,pool){
        let sid = req.params.sid;
        console.log(sid);
        pool.getConnection((error,connection)=>{
            if(connection){
                connection.query("SELECT * from studentcourse sc INNER JOIN studentdetails sd ON sd.sid = sc.sid LEFT JOIN trainerdetails td ON sc.tid=td.tid  LEFT JOIN course c ON sc.cid=c.cid WHERE sd.sid=? ",sid,(err,result_id)=>{
                    if(result_id){
                        console.log(result_id);
                        res.status(200).send({
                            message: "Record found ",
                            data: result_id
                        })
                    }else if(err){
                        res.status(400).send({
                            message: "Query error",
                            data: err
                        })
                    }
                    
                })
            }
        })
        
        
    }
    
      /* GET students by ID */

    
    
    
    
    
    
    
    
    
    
    
    
    
    /* UPDATE students data */
    
    
    updateStudents(req,res,pool){
        var sid = req.body.sid;
        
        pool.getConnection((error,connection) => {
            
            if(connection){
                connection.query('select * from student_course where sid=?',[sid],(err,result_set)=>{
                    
                })
                
                
            }else{
                
                res.status(400).send({
                    message: error
                })
            }
            
        })        
        
        
        
    }
    

     /* UPDATE students data */
    
    
   /*delete a student*/
    
    delstudent(req,res,pool){
        let sid=req.body.sid;
        pool.getConnection((error,connection)=>{
            if(connection){
                connection.query('delete from studentdetails sd,studentattendance sa,studentcourse sc from sd inner join sa inner join sa inner join sc where sd.sid=sa.sid and .........',sid,(error,dresult)=>{
                    if(dresult){
                        
                        res.status(200).send({
                            message: "student deleted",
                            data: dresult})
                       }else{
                            res.status(400).send({
                                   message: error
                                  })
                          }
                 })
            }else{
                res.status(400).send({
                    message: error
                })
            }
        })
    } 
    
    /* del a student close */
    
    
    

    
    
}


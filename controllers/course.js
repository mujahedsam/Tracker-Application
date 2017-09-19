export class Course{

        constructor(){

           }

    addcourse(req,res,pool) {
           let course_name=req.body.coursename;
           var coursedata={
                coursename : course_name
               }
               pool.getConnection((error,connection)=>{
                 if(connection){

                   connection.query('select * from course where coursename=?',coursedata.coursename,(error,result)=>{
                       if(result){
                           if(result.length!=0){
                                res.send({statuscode: 200,message : "Course already exists",data:result});
                           }else{
                                connection.query('insert into course set?',coursedata,(error,courseresult)=>{
                                       if(courseresult){
                                        res.send({
                                                  statuscode: 200,
                                                  message : "Course inserted successfully",
                                                   data:courseresult
                                                  })
                                       }else if(error){
                                           res.send({
                                                  statuscode: 400,
                                                  message : error
                                                    })
                                       }
                                })
                           }
                       }else{
                        res.send({statuscode: 400,message : error})
                       }
                   })
                 }else{
                   res.send({statuscode: 400,message : " DB connection error"})
                 }
               })
           

     }

     viewcourses(req,res,pool){
      pool.getConnection((error,connection)=>{
        if(connection){
           connection.query('select * from course',(error,result2)=>{
            if(result2){
              res.send({  statuscode: 200,
                      message : "Course data fetched successfully",
                      data:result2  })

            }else{
                 res.send({statuscode: 400,
                           message : error})
            }
           })
        }else{
           res.send({statuscode: 400,message : " DB connection error"})
        }
      }) 


     }
     deletecourses(req, res,pool){
      let cid=req.body.cid;
          pool.getConnection((error,connection)=>{
            if(connection){
              connection.query('delete from course where cid=?',cid,(error,res3)=>{
                if(res3){
                  res.send({  statuscode: 200,
                      message : "Coursename deleted successfully",
                      data:res3  })

                }else{
                  res.send({statuscode: 400,
                           message : error})
                }
              })

            }else{
            res.send({statuscode: 400,message : " DB connection error"})
            }

          })
          
     }
     updatecourse(req,res,pool,id){
      let cid=req.body.cid;
      let coursename=req.body.coursename;
      pool.getConnection((error,connection)=>{
        if(connection){
                connection.query('update course set coursename=? where cid=?', [coursename,cid], (error,result4)=>{
                  if(result4){
                    res.send({  statuscode: 200,
                      message : "Coursename upadated successfully",
                      data:result4  })
                               
                  }else{
                    res.send({statuscode: 400,
                           message : error})
                  }
                     
                })
        }else{
          res.send({statuscode: 400,message : " DB connection error"})
        }
      })
     }
} 
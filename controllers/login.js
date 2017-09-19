export class Login {

constructor(){

}

    loginadmin(req, res,pool) {
           let name=req.body.adminname;
           let password=req.body.password;
           pool.getConnection((error,connection)=>{
            if(connection){
               connection.query('select * from admin where adminname=? and password=?',[name,password],(error,result)=>{
                if(result){
 
                if(result.length!=0){
                     res.send({
                        statuscode: 200,
                        message : "User data fetched successfully",
                        data:result
                     })
                }else{
                   res.send({
                        statuscode: 200,
                        message : "user not found",
                        data:result
                     })


                }
            }else{
               res.send({
                        statuscode: 400,
                        message : "error"
                     }) 
            }

               })
            }else{
                console.log("connection error"+error);
            }
           })
    }  

}

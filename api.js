import {Login} from "./controllers/login.js";
import {Trainer} from "./controllers/trainer.js";
import {Student} from "./controllers/student.js";
import {Course} from "./controllers/course.js";
export class api {
    
    
    constructor(pool,router) {
        
        this.router = router;
        this.routes(pool,this.router);
        this.addstudent = new Student();
        this.loginobj= new Login();
        this.trainerlogin = new Login();
        this.addtrainer = new Trainer();
        this.courseobj=new Course(); 
    }
    routes(pool,router) {
        router.post('/login',(req,res)=>{
            console.log(req.body.role+req.body.userName+req.body.password);
             res.status(200).send({
                            message: "holaaaa!! hari test successfull!"
                        })
            
        })
        router.post('/adminlogin', (req, res) => { 
            this.loginobj.loginadmin(req,res,pool);
        })

        router.post('/tslogin', (req, res) => {
            this.trainerlogin.login(req, res,pool);
        })

        router.post('/addtrainer', (req, res) => { 
         
           this.addtrainer.inserttrainer(req,res,pool);

        })
        router.post('/updatetrainer',(req,res)=>{
            this.addtrainer.updatetrainer(req,res,pool);
        })
        router.post('/addstudent', (req, res) => {
            
            this.addstudent.insertstudent(req,res,pool);
        })
        router.post('/addcourses',(req,res)=>{
 
            this.courseobj.addcourse(req,res,pool);
        })
        router.post('/viewcourses',(req,res)=>{
         
            this.coursesobj.viewcourses(req,res,pool);
        })
        router.post('/deletecourses',(req,res)=>{
      
            this.courseobj.deletecourses(req,res,pool);
        })
        router.post('/updatecourses',(req,res)=>{
        
            this.courseobj.updatecourse(req,res,pool);
        })
        router.post('/deletestudent',(req,res)=>{
            this.addstudent.delstudent(req,res,pool);
        })

    }
}

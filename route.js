import  {Student}   from "./controllers/student.js";
import {Trainer} from "./controllers/trainer.js";
import {Qr} from "./controllers/qrcode.js";

export class route {
    constructor(pool,router) {
        this.router = router;
        this.getroutes(pool,this.router);
        this.addstudent = new Student();
        this.gettrainers=new Trainer();
        this.qrobj=new Qr();
        
    }
    getroutes(pool,router) {
        
        router.get('/gettrainersbycourse/:cid', (req, res) => {
           this.gettrainers.getTrainerByCourse(req,res,pool);
        })

        router.get('/gettrainersbyid/:tid',(req,res)=>{
            this.gettrainers.getTrainersById(req,res,pool);
        })
        
        router.get('/getalltrainers',(req,res)=>{
            this.gettrainers.getalltrainers(req,res,pool);
        })

        router.get('/deletetrainer/:tid',(req,res)=>{
            this.gettrainers.deltrainerbyid(req,res,pool);
        })
    
        router.get('/getstudents', (req, res) => {
            this.addstudent.getStudents(req,res,pool);
        })
        
        router.get('/getstudentsbyid/:sid',(req,res)=>{
            this.addstudent.getStudentById(req,res,pool);
            
        })
        router.get('/qrcode',(req,res)=>{
            this.qrobj.generateQrCode(req,res,pool);
        })

        router.get('/test',(req,res)=>{
            
            res.status(200).send({
                            message: "holaaaa!! test successfull!"
                        })
            
            
        })
    }


}

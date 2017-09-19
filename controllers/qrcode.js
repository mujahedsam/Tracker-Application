var QRCode = require('qrcode');

export class Qr{
    constructor(){
        
   }
    
   /* GENERATE QR CODE */
    
   generateQrCode(req,res,pool){
       var options = {
   root: '/TrackerApp1',
   dotfiles: 'deny',
   headers: {
       'x-timestamp': Date.now(),
       'x-sent': true
   } }

   let secret_key="123";
   let uniqueid="123456";
   let timestamp="1199";
   var qrdata= 
     {secret_key:secret_key,
     uniqueid:uniqueid,
     timestamp:timestamp}
     var newdata=JSON.stringify(qrdata);

console.log(newdata);
        
       
       
       QRCode.toFile('./qrimage.jpg',newdata, (err,string)=> {
        if (err) {
            res.status(400).send({
                               message:err
                            })  
        }else{
              res.sendFile('qrimage.jpg',options,(err)=>{
                  if(err) console.log(err);
              });
            }
          
        })

   }
    
   /* GENEREATE QR CODE */
}
const options = {
    apiKey: '397078d681002f67468c23df28613c129dadca0eca7333def1949a6b98f3d385',
    username: 'sandbox'
}

const AfricasTalking = require('africastalking')(options);

const sms = AfricasTalking.SMS;


export async function sendATMessage(){
    const options = {
        // Set the numbers you want to send to in international format
        to: '+254706229743',
        // Set your message
        message: "Hello",
        // Set your shortCode or senderId
        from: 'EbeNet'
    }  

    // Thatâ€™s it, hit send and weâ€™ll take care of the rest
   try{
       const result=await sms.send(options)
       console.log(result.SMSMessageData.Recipients)//res.SMSMessageData.Recipients)

   }
   catch(err){
       console.log(err)
   } 
    //}).catch(err=>{    //     console.log(err)
  
}
require('dotenv').config()

const app=require('./app')
const appSetting=require('./config/appSetting')

const main=async()=>{
 try {
     const PORT=appSetting.app.PORT;
     app.listen(PORT,()=>{
         console.log(`Running on ${PORT}`)
     })
 } catch (error) {
     console.log(error.message);
     process.exit(1);   
 };
}
main()
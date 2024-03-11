const {register}=require("../controllers/authControllers")


module.exports=function(app){
    app.post("/crm/api/v1/auth/signup",register)
}
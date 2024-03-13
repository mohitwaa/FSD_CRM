const {register, login}=require("../controllers/authControllers")


module.exports=function(app){
    app.post("/crm/api/v1/auth/signup",register);
    app.post("/crm/api/v1/auth/login",login)
}
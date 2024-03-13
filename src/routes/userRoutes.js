const { getAllUsers ,updateUser }=require("../controllers/userControllers");
const{ verifyToken ,isAdmin }=require('../middlewares/authMiddleware');
const { verifyUpdatedRequest }=require('../middlewares/userMiddleware');

module.exports=function(app){
    app.get("/crm/api/v1/users",[verifyToken,isAdmin],getAllUsers);
    app.put("/crm/api/v1/users/:userId",[verifyToken,verifyUpdatedRequest],updateUser);
}
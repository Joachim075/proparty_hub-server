
const isAdmin=(req,res,next)=>{
    
// get req.tokenData from verify-token to access role
if (req.tokenData.role==="ADMIN") {
   
    console.log(req.token)
    console.log("Admin working")
    next()
} else {
    console.log("is not admin at all")
}
}

export{
    isAdmin
}
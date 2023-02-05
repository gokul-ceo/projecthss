export function Verifyauthuser(req,res,next){
if(req.isAuthenticated()){
    return next()
}else{
    console.log("user is not authenticated...!");
    res.sendStatus(404)
    // res.json({
    //     loginstatus:'failed',
    //     message:'User not logged in!'
    // })
    // res.writeHead(200,'Please login to continue!')
    // res.redirect('http://localhost:4000/auth/google')
}
}
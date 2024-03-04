exports.getChatRoom= (req,res,next)=>{
    const sessionId = req.params.sessionId;
    res.render('chatRoom',{pageTitle:'Chat Room', sessionId:sessionId});
}
const session = require('../models/session');
exports.getIndex = (req,res,next)=>{
    res.render('index',{pageTitle:'Index',path:'/'});
    console.log("It's the homepage.");
}

exports.createRoom = (req,res,next)=>{
    const sessionId = session.generateSession();
    req.session.sessionId = sessionId;
    console.log('Session ID set:', sessionId); // Log the session ID for debugging
    res.redirect(`/session/${sessionId}`);

}


exports.getjoinRoom=(req,res,next)=>{
    res.render('joinRoom',{pageTitle:'Join Room'})
}

exports.postjoinRoom=(req,res,next)=>{
    const sessionId = req.body.roomId;
    req.session.sessionId = sessionId;
    res.redirect('/session/${sessionId}');

}


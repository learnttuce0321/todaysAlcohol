
const Clogout =  (req,res) => {
  console.log(req);
  
  res.clearCookie('loginCookie',);
  res.clearCookie('userIdCookie');
  res.cookie("hi", '', {path: '/'})
  res.cookie("bye", 'bye', )
  console.log(req.cookies, req.cookies.loginCookie);
  
  // console.log(req.cookies, '11111');
  console.log('22222222');
  
}

export {
  Clogout
}
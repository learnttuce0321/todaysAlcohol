const Clogout = (req,res) => {
  res.clearCookie('loginCookie')
  res.clearCookie('userIdCookie')
  console.log(req.cookies, '11111');
}

export {
  Clogout,
}
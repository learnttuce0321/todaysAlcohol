const Clogout = (req, res) => {
    res.clearCookie('loginCookie');
    res.clearCookie('userIdCookie');
};

export { Clogout };


export const LogOut = async (req, res) => {
     console.log(req.cookies)
    try {
        if (req.cookies && req.cookies.user_token) {
            res.clearCookie('user_token');
        }
        //res.cookies tiene que seguir con un res.send para que lo envie
        res.send({ message: 'Logged Out' });
    } catch (error) {
        console.log(error);
    }
};


export const LogOut = async (req, res) => {

    try {

        if (req.cookies && req.cookies.user_token) {

            res.clearCookie('user_token');

        }
        // res.send({ message: 'Logged Out' });
    } catch (error) {
        console.log(error);
    }
};




export const SignIn = async (req, res) => {
    const expiration = 1000 * 60 * 60 * 24 * 28;
    const sessionOpen = req.body.checked;

    try {
        console.log(req.body);
        
        res.cookie('user_token', { sessionOpen: sessionOpen, token: '12345',id:'123'}, {
            maxAge: expiration,
            httpOnly: true,
            sameSite: 'lax',
        });
        res.status(200).send({ status: 'Logged',user:{name:'Matteo'}});
        //Incorrect Login response
       // res.status(201).send({ status: 'Incorrect',message:'Contraseña o usuario incorrectos'});
    } catch (error) {
        res.clearCookie('user_token')
        res.status(403).send({message:'Problemas con el servidor, por favor intentelo más tarde'})
        console.log(error)
    }
}
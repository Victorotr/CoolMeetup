import jsonwebtoken from 'jsonwebtoken';



export const isLogged = async (req, res) => {
    
  
    try {
    
        if (req.cookies && req.cookies.user_token) {
           
            const token = req.cookies.user_token.token;
        
            const validate = jsonwebtoken.verify(token, process.env.SECRET_TOKEN);
        
            const user = {id:validate.id,username:validate.username};

            res.status(200).send({user:user})
        }


    } catch (error) {
        
        res.clearCookie('user_token')
        res.status(403).send({ message: 'Problemas con el servidor, por favor intentelo más tarde' })
        
    }
}
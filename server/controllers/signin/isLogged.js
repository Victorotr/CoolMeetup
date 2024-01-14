


export const isLogged = async (req, res) => {
   

    try {
        console.log(req.cookies);
        if(req.cookies && req.cookies.user_token){
            const cookieInfo = req.cookies.user_token;
            console.log(cookieInfo.id)
            res.send({user:{name:'matteo',id:'123'}})
        }
       
    } catch (error) {
        res.clearCookie('user_token')
        res.status(403).send({message:'Problemas con el servidor, por favor intentelo más tarde'})
        console.log(error)
    }
}

import fs from 'fs'
export const getImg = async (req, res) => {
    try {
        const img = fs.readFileSync('./Controllers/users/avatars/' + req.params.id);
        if (img) {
            res.end(img)
        } 
    } catch (error) {
        console.log(error)
        const img = fs.readFileSync('./Controllers/users/avatars/no_picture.png');
        res.end(img)
    }

}
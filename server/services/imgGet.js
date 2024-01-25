
import fs from 'fs'
export const getImg = async (req, res) => {
    const fileType = req.params.fileType;
    try {
        let img;
        if (fileType=="Avatar"){
            img = fs.readFileSync('./Controllers/users/avatars/' + req.params.id);
        } 
        else if (fileType=="Meetup"){
            img = fs.readFileSync('./Controllers/meetups/images/' + req.params.id);
        }
        
        if (img) {
            res.end(img)
        } 
    } catch (error) {
        console.log(error)
        const img = fs.readFileSync('./Controllers/users/avatars/no_picture.png');
        res.end(img)
    }

}
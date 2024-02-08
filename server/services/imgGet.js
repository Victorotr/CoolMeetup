
import fs from 'fs'
export const getImg = async (req, res) => {
    const fileType = req.params.fileType;
    
    try {
        let img;
        if (fileType=="Avatar"){
            img = fs.readFileSync('./Controllers/users/avatars/' + req.params.id);
        } 
        else if (fileType=="Meetup"){
            img = fs.readFileSync('./Controllers/users/meetup/' + req.params.id);
        }
        
        if (img) {
            res.end(img)
        }else{
            const img = fs.readFileSync('./Controllers/users/avatars/no_picture.png');
            res.end(img)
        }
    } catch (error) {
        console.log(error)
        try {
             const img =fileType === 'Avatar' ? fs.readFileSync('./Controllers/users/avatars/no_picture.png') : fs.readFileSync('./Controllers/users/meetup/no_meetup_image.png');
        res.end(img)
        } catch (error) {
            console.log(error);
        }
    }

}
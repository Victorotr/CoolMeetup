
import fs from 'fs'
export const getMeetupImg = async (req, res) => {
    try {
        const img = fs.readFileSync('./Controllers/users/meetup/' + req.params.id);
        if (img) {
            res.end(img)
        } 
    } catch (error) {
        console.log(error)
        const img = fs.readFileSync('./Controllers/users/meetup/no_meetup_image.png');
        res.end(img)
    }

}
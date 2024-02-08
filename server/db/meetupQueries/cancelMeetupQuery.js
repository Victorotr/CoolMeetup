import { getConnection } from '../ConnectionDB.js';

export const cancelMeetupQuery = async (meetup_id,user_id) => {
  let connection;
  console.log('query meetup id',meetup_id)
  try {
    connection = await getConnection();
    const [checkMeetup] = await connection.query(`
      SELECT * FROM meetups WHERE id_meetup = ?;
      `,
      [meetup_id] 
    );
    const meetupOwnerId = checkMeetup[0].id_main_user;

    console.log(checkMeetup,meetupOwnerId);
    if(user_id === checkMeetup[0].id_main_user){
      const [cancelMeetup] = await connection.query(
        `UPDATE meetups SET cancelled = 1 WHERE id_meetup = ?`,[meetup_id]
      );
    if(cancelMeetup.affectedRows >0){
      console.log(cancelMeetup)
      return {done:true,message:'Meetup cancelado correctamente'}
    }else{
      return {done:false,message:'Hubo un error al cancelar el Meetup'}
    }
      
    }
    
  } catch (error) {
    console.error(error);
    return {done:false,message:'Hubo un error al cancelar el Meetup'}
  } finally {
    if (connection) connection.release();
  }
};

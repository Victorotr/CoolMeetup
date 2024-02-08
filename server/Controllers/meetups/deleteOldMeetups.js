import { deleteOldMeetupQuery } from "../../db/meetupQueries/deleteOldQuery.js";


export const deleteOldMeetups = async ()=>{
 await deleteOldMeetupQuery();

}
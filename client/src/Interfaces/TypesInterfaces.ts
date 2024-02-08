export  interface Meetup {
    id_meetup: number;
    meetup_datetime: string;
    cancelled: boolean;
    meetup_theme: string;
    meetup_image: string;
    meetup_title: string;
    meetup_description: string;
    assistants: number;
    main_user_details: {
      user_id: number;
      avatar: string;
      username: string;
    };
  }
  
export   interface MeetupCardProps {
    meetup: Meetup;
  }
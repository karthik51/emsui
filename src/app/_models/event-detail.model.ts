export interface EventDetailModel {
    id: string;   
    eventTitle: string;
    eventDescription: string;
    eventDate: Date;
    eventStartTime: Date;
    eventEndTime: Date;
    eventLocation: string;    
    isTransportation: boolean;   
    poc: string;
    registerUser: RegisterUser[];
}

export interface RegisterUser
{
    userId: string,
    userName: string
}


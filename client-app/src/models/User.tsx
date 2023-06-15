export interface User {
username:string;
displayName:string;
token:string;
image?:string;
}

export interface UserFormValues {
    emaill:string;
    password:string;
    displayName:string;    
    username:string;
}
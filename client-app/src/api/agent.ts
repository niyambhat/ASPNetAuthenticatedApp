import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activity";
import { User, UserFormValues } from "../models/User";


const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, delay);
    })
}
axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use((response: AxiosResponse) => {
    return new Promise<AxiosResponse>((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 1000);
    });
  });

axios.interceptors.request.use(config =>{
  const token = localStorage.getItem('jwt');
  if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
})
  
const responseBody =<T> (response:AxiosResponse<T>) => response.data
const requests ={
    get:<T>(url:string) =>axios.get<T>(url).then(responseBody),
    post:<T>(url:string, body:{}) =>axios.post<T>(url, body).then(responseBody),
    put:<T>(url:string, body:{}) =>axios.put<T>(url, body).then(responseBody),
    delete:<T>(url:string) =>axios.delete<T>(url).then(responseBody)
}

const Activities ={
    list:()=>requests.get<Activity[]>("/activities"),
    details:(id:string)=>requests.get<Activity[]>(`/activities/${id}`),
    create:(activity:Activity)=>requests.post<void>('/activities', activity),
    update:(activity: Activity)=>axios.put<void>(`/activities/${activity.id}`, activity),
    delete:(id:string)=>axios.delete<void>(`/activities/${id}`),
}

const Account ={
current: ()=>requests.get<User>('account'),
login: (user:UserFormValues)=>requests.post('/account/login', user),
register:(user: UserFormValues)=> requests.post<User>('account/register', user)
}


const agent ={
    Activities,
    Account
}

export default agent
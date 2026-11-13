import axios from 'axios';
export const api=axios.create({baseURL:'/api'});
api.interceptors.request.use(c=>{const t=sessionStorage.getItem('foodlink_token');if(t)c.headers.Authorization=`Bearer ${t}`;return c;});
export const imageFallback='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85';

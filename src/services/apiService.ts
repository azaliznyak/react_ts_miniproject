import axios from "axios";
import { baseURL } from "../constants";

const apiService=axios.create({baseURL})


apiService.interceptors.request.use(request=>{
    const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmY5YWUxOThiZmQyZGNkMTlmOWUzMjZlZGE3N2RlZiIsInN1YiI6IjY1ZGNmZDY3YzQzM2VhMDE4NjNiY2I0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvZnpfZN-vINUmixFtsIPapUifBhg9svChInorWWg9I'

    if (token){
        request.headers.Authorization=`Bearer ${token}`
    }
    return request
})


export {
    apiService
}
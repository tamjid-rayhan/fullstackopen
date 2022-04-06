import axios from "axios";
const base_uri = 'http://localhost:3001/persons'

const getAll = ()=>{
    return axios
        .get(base_uri)
        .then((response)=>{
            return response.data
        })
}


const create =(person)=>{
    return axios
        .post(base_uri, person)
        .then((response)=> response.data)
}

const deleteID =(id)=>{
    return axios
                .delete(`${base_uri}/${id}`)
}
export default {getAll, create, deleteID}
import axios from "axios"

export default class NoteService{
    getNotes(){
        return axios.get("http://localhost:5000/api/notes/allnotes/getall")
    }
}
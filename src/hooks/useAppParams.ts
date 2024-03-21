import {useParams} from "react-router-dom";

const useAppParams=()=>useParams<string>()

export {
    useAppParams
}
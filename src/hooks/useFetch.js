import {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie'
import API from '../api-service'

function useFetch() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(null)
    const [token] = useCookies(['mr-token'])

    useEffect(() => {
        async function fetchData(){
            setLoading(true)
            setErr(null)
            const data = await API.getMovies(token['mr-token'].token)
                .catch(error=> setErr(error))
            setData(data)
            setLoading(false)
        }

        fetchData();
    }, [])

    return [data, loading, err]
}

export default useFetch
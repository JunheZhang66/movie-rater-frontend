import React, {useState, useEffect} from 'react';
import API from '../api-service';
import { useCookies } from 'react-cookie';

function MovieForm(props){

    const mov = props.movie;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token] = useCookies(['mr-token'])

    const isDisabled = title.length === 0 || description.length === 0;

    useEffect(()=>{
        setTitle(mov.title)
        setDescription(mov.description)
    }, [mov])

    const updateClicked = () =>{
        API.updateMovie(mov.id, {title:title, description:description}, token['mr-token'].token)
        .then( resp => props.movieUpdated(resp))
        .catch(err => console.log(err))

    }

    const createClicked = () =>{
        API.createMovie({title, description}, token['mr-token'].token)
        .then( resp => props.movieCreated(resp))
        .catch(err => console.log(err))

    }

    return (
        <React.Fragment>
            
            <div>
                <label htmlFor="title"> Title </label><br />
                <input type="text" placeholder="title" id="title" value={title} 
                    onChange={evt =>setTitle(evt.target.value)}
                /> <br />
                <label htmlFor="description">Description</label> <br />
                <textarea placeholder="Description" id="description" value={description}
                    onChange={evt =>setDescription(evt.target.value)}
                ></textarea> <br />
                {mov.id?
                    <button onClick={evt=>updateClicked()} disabled={isDisabled}>Update</button>:
                    <button onClick={evt=>createClicked()} disabled={isDisabled}>Create</button>
                }
            </div>
            
        </React.Fragment>
    )
}

export default MovieForm;
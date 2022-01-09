import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';

function MovieDetails(props) {

    const mov = props.movie;

    const [highlighted, setHighlighted] = useState(-1);

    const highlight = high => evt => {
        setHighlighted(high);
    }

    const [token] = useCookies(['mr-token'])

    // console.log("inside detail=====================", token['mr-token'].token)
    const rateClicked = high => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mr-token'].token}`
                },
                body: JSON.stringify({
                    stars: high + 1,
                }),
            })
            .then(() => getDetails())
            .catch(err => console.log(err))
    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mr-token'].token}`
                },

            })
            .then(res => res.json())
            .then(res => props.updateMovie(res))
            .catch(err => console.log(`Token ${token["mr_token"]}`))
    }

    return ( <React.Fragment > {mov ? ( <div>
                    <h1 > { mov && mov.title } </h1> <p> { mov && mov.description } </p> <FontAwesomeIcon className = { mov.avg_rating > 0 ? "orange" : "" }
                    icon = { faStar }/> 
                    <FontAwesomeIcon className = { mov.avg_rating > 1 ? "orange" : "" }
                    icon = { faStar }
                    /> <FontAwesomeIcon className = { mov.avg_rating > 2 ? "orange" : "" }
                    icon = { faStar }
                    /> <FontAwesomeIcon className = { mov.avg_rating > 3 ? "orange" : "" }
                    icon = { faStar }
                    /> <FontAwesomeIcon className = { mov.avg_rating > 4 ? "orange" : "" }
                    icon = { faStar }
                    />
                    ({ mov.no_of_ratings }) <div className = "rate-container" >
                    <h2> Rate it </h2> { [...Array(5)].map((e, i) => {
                        return <FontAwesomeIcon key = { i }
                        className = { highlighted > i - 1 ? "purple" : "" }
                        icon = { faStar }
                        onMouseEnter = { highlight(i) }
                        onMouseLeave = { highlight(-1) }
                        onClick = { rateClicked(i) }/>
                    })

                } </div> </div>
            ): null
        } </React.Fragment>

)

}

export default MovieDetails;
import React from 'react';

const Genres = ({books, genreHandler}) => {

    let dupeGenresArray = []

    books.forEach(book=> {
        book.genres.forEach(genre => dupeGenresArray.push(genre))
    })

    const genresArray = [...new Set(dupeGenresArray)];

    return(
        <div>
        {genresArray.map(genre => <button key={genre} onClick={()=> {
            console.log('Cliccato ', genre)
            genreHandler(genre)}}>{genre}</button>)}
        <button key="all" onClick={()=> genreHandler(null)}>All</button>
        </div>
    )
};

export default Genres
const imdbUrl = "https://www.imdb.com/title";
const tmdbUrl = "https://www.themoviedb.org";

export const generateIMDbUrl = (type, id, seasonNumber = null) => {
    const episodeString = (seasonNumber !== null) ? `/episodes?season=${seasonNumber}` : '';
    
    return type.toLowerCase() === "movie"
        ? `${imdbUrl}/${id}`
        : `${imdbUrl}/${id}/${episodeString}`
}

export const generateTMDbUrl = (type, id, seasonNumber = null, episodeNumber = null) => {
    let episodeString = (seasonNumber !== null) ? `season/${seasonNumber}` : '';
    episodeString += (episodeNumber !== null) ? `/episode/${episodeNumber}` : '';

    return type.toLowerCase() === "movie"
        ? `${tmdbUrl}/movie/${id}`
        : `${tmdbUrl}/tv/${id}/${episodeString}`;
}
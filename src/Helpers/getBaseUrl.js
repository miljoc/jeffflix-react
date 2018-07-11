const getBaseUrl = () => {
    let url = 'http://atalanta.bysh.me:8080';
    
    // eslint-disable-next-line
    let path;

    // For use when we have it running on servers
    if (typeof window !== 'undefined') {
        path = window.location.protocol + '//' + window.location.host;
    } else {
        console.log('Cant Find Base Url');
    }

    return url
}

export default getBaseUrl
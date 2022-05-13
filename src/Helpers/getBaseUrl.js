/**
 * Generate base url using current window.location
 * @return {String} String containing the base url
 */
export const getBaseUrl = () => {
    let path;

    if (process && process.env && process.env.REACT_APP_GRAPHQL_URL) {
        path = process.env.REACT_APP_GRAPHQL_URL;
    } else if (typeof window !== 'undefined') {
        path = `${window.location.protocol}//${window.location.host}`;
    } else {
        return false;
    }

    return path;
};

/**
 * Generate fully qualified domain name
 * @return {String} String containing the base url
 */
export const getFQDNUrl = () => {
    let path;

    if (process && process.env && process.env.REACT_APP_FQDN_URL) {
        path = process.env.REACT_APP_FQDN_URL;
    } else if (typeof window !== 'undefined') {
        path = `${window.location.protocol}//${window.location.host}`;
    } else {
        return false;
    }

    return path;
};
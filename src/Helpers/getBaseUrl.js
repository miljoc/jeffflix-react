/**
 * Generate base url using current window.location
 * @return {String} String containing the base url
 */

const getBaseUrl = () => {
  let path;

  if (typeof window !== 'undefined') {
    path = 'http://maran.atalanta.bysh.me';
    // path = `${window.location.protocol}//${window.location.host}`;
  } else {
    return false;
  }

  return path;
};

export default getBaseUrl;

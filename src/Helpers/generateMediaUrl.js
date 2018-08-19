/**
 * Generates url for media item
 * @param {string string string} Type of media, UUID and Name
 * @return {String} Returns url string
 */

const generateMediaUrl = (type, uuid, name) => {
    let compiledname = name.replace(/\s+/g, '-').toLowerCase();

    return `/${type.toLowerCase()}/${uuid}/${compiledname}`
}

export default generateMediaUrl
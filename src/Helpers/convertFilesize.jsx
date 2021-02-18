/**
 * Convert file size from bytes
 * @param filesize Size of file in bytes
 * @return formatted value
 */

// https://stackoverflow.com/a/18650828

const convertFilesize = (filesize, decimals = 2, mb = false) => {
    if (filesize === 0 || filesize < 0) return false;

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(filesize) / Math.log(k));

    if(mb){
        return `${parseFloat((filesize / (k * k)).toFixed(dm))} ${sizes[2]}`;
    }

    return `${parseFloat((filesize / (k ** i)).toFixed(dm))} ${sizes[i]}`;
};

export default convertFilesize;

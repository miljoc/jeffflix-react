/**
 * Convert bitrate from bytes
 * @param filesize Size of file in bytes
 * @return formatted value
 */

// https://stackoverflow.com/a/18650828

const convertBitrate = (bitrate) => {
    const mbps = (bitrate / 1e+6);

    if(mbps < 1){
        return `${parseFloat((bitrate / 1000).toFixed(2))} kb/s`;
    }

    return `${parseFloat(mbps.toFixed(1))} mb/s`;
};

export default convertBitrate;

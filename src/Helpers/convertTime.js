/**
 * Convert Float Timestamp to Minutes
 * @param Float String
 * @return {string} string with Minutes
 */
export const convertToMinutes = (time) => `${~~(time / 60)} minutes`;

/**
 * Convert Float Timestamp to Minutes & Seconds
 * @param Float String
 * @return {string} string with Minutes & Seconds
 */

export const convertToMinutesSeconds = (time) => {
    const mins = ~~(time / 60);
    const secs = ~~time % 60;

    return `${mins > 0 ? `${mins} Minutes` : ''} ${secs} Seconds`;
};

/**
 * Convert Float Timestamp to Hours, Minutes & Seconds
 * @param Float String
 * @return {string} string with Hours, Minutes & Seconds
 */

export const convertToHMS = (time) => {
    const hours = ~~(time / 3600);
    const remainingTime = time - hours * 3600;
    const mins = ~~(remainingTime / 60);
    const secs = ~~time % 60;

    return `${hours > 0 ? `${hours}:` : ''}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

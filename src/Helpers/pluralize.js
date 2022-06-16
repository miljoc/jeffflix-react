/**
 * Given a count, decide whether to return the suffix
 * 
 * @param {int} count
 * @param {string} word 
 * @param {string} suffix 
 * @param {boolean} addCount - whether to prefix the string with the number given
 * @returns {string}
 */

const pluralize = (count, word, suffix = 's', addCount = false) =>
    `${addCount ? `${count} ` : ''} ${word}${count !== 1 ? suffix : ''}`;

export default pluralize;
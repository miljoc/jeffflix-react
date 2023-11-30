/**
 * Seperates suggestions by type.
 * @param {Array} arr List of suggestions to be seperated by type
 * @return {Array} Updated suggestions array seperated by type
 */

const updateSuggestions = (arr) => {
    if (arr === undefined || arr.length === 0) return [];

    const numberOfResults = 5;

    const updatedSuggestions = [
        {
            title: null,
            suggestions: [],
        },
        {
            title: 'Films',
            suggestions: [],
        },
        {
            title: 'Series',
            suggestions: [],
        }
    ];
    
    if(
        arr.filter(sug => sug.type === 'Movie').length > numberOfResults ||
        arr.filter(sug => sug.type === 'Series').length > numberOfResults
    ){
        updatedSuggestions[0].suggestions.push({
            type: 'Link',
            url: '/search',
            name: 'View All Results'
        });
    }

    arr.forEach((sug) => {
        if (sug.type === 'Movie' && updatedSuggestions[1].suggestions.length < numberOfResults) {
            updatedSuggestions[1].suggestions.push(sug);
        } else if (sug.type === 'Series' && updatedSuggestions[2].suggestions.length < numberOfResults) {
            updatedSuggestions[2].suggestions.push(sug);
        }
    });

    const newSuggestions = updatedSuggestions.filter((type) => type.suggestions.length > 0);

    return newSuggestions;
};

export default updateSuggestions;

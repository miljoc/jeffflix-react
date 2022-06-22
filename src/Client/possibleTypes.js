import fragmentTypes from './fragmentTypes.json';

// eslint-disable-next-line
const filteredData = fragmentTypes.data.__schema.types.filter(
    (type) => type.possibleTypes !== null,
);

const possibleTypes = {};

filteredData.forEach(supertype => {
    if (supertype.possibleTypes) {
        possibleTypes[supertype.name] =
            supertype.possibleTypes.map(subtype => subtype.name);
    }        
})

export default possibleTypes;

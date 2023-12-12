const propertiesMap = (map, prefix = "") => {
    let properties = '';
    const newPrefix = prefix === "" ? "" : `${prefix}-`;
    
    Object.keys(map).map((key) => {
        properties += `
            --jeffflix--${newPrefix}${key}: ${map[key]};
        `;
        return key;
    });

    return properties;
}

export default propertiesMap;
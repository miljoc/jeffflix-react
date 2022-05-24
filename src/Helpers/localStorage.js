export const setLocalStorage = (val, label) => {
    // Use JSON stringify method to save current sort state
    if (localStorage){
        localStorage.setItem(label, JSON.stringify(val));
    }
}

export const getLocalStorage = (prefix, label) => {
    if (localStorage){
        return JSON.parse(localStorage.getItem(`${prefix}-${label}`));
    }
    
    return null;
}
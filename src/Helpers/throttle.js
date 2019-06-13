const throttle = (fn, delay) => {
    let last = 0;

    return function throttleInternal(...args) {
        const now = new Date().getTime();

        if (now - last < delay) {
            return null;
        }
        last = now;

        return fn(...args);
    }
};

export default throttle;

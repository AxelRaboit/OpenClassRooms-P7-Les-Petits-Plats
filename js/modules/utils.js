const clickOut = (target, ref) => {
    return !ref.contains(target);
};

const utils = {
    clickOut
}

export default utils;

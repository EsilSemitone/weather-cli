export function getArgs(args) {
    const res = {};

    args.slice(1).forEach((el, index, array) => {
        if (['-s', '-h', '-t'].includes(el)) {
            if (index == array.length - 1 || ['-s', '-h', '-t'].includes(array[index + 1])) {
                res[el[1]] = true;
            }
            else {
                res[el[1]] = array[index + 1]
            }
        }
    });
    return res;
}
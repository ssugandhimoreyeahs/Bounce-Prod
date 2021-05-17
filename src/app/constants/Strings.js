export default class Strings {

    static requiredFieldError = (title = '') => {
        return `Required ${title}`;
    }
    static minimumFieldError = (title = '', len = 0) => {
        return `${title} length should be ${len}`;
    }
}

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_REGEX = /^(?:\+?\d{2}[ -]?[\d -][\d -]+)$/;
const NAME_REGEX = /^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/;
const LOGIN_REGEX = /^[a-zA-Z0-9]+$/;

export default function validateUserFormInput({ name, value, required }) {
    let error = '';

    switch (name) {
        case 'firstname':
        case 'secondname':
            error = NAME_REGEX.test(value)
                ? ''
                : `Please enter a valid ${name}`;
            break;
        case 'phone':
            error = PHONE_REGEX.test(value) ? '' : 'Please enter a valid phone';
            break;
        case 'email':
            error = EMAIL_REGEX.test(value) ? '' : 'Please enter a valid email';
            break;
        case 'username':
            error = LOGIN_REGEX.test(value)
                ? ''
                : 'Username should contain only alphanumeric symbols';
            break;
        case 'password':
            if (value.length > 0) {
                if (value.length < 6) {
                    error = 'Password is too short!';
                } else if (!LOGIN_REGEX.test(value)) {
                    error = 'Username should contain only alphanumeric symbols';
                }
            }
            break;
        default:
            break;
    }

    if (required && !value) {
        error = 'This field is required';
    }

    return error;
}

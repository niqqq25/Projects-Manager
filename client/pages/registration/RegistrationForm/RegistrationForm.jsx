import React from 'react';
import { Redirect } from 'react-router-dom';
import './registrationForm.css';

import FormInput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';

import * as UserAPI from '../../../requests/user';

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_REGEX = /^(?:\+?\d{2}[ -]?[\d -][\d -]+)$/;
const NAME_REGEX = /^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/;
const LOGIN_REGEX = /^[a-zA-Z0-9]+$/;

const INVALID_FORM_MESSAGE = 'Please correctly fill all required fields';

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            secondname: null,
            company: null,
            phone: null,
            email: null,
            username: null,
            password: null,
            errors: {
                firstname: '',
                secondname: '',
                company: '',
                phone: '',
                email: '',
                username: '',
                password: '',
            },
            loading: false,
            loginRedirect: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(event) {
        const { id, value } = event.target;
        const errors = this.state.errors;

        switch (id) {
            case 'firstname':
            case 'secondname':
                errors[id] = NAME_REGEX.test(value)
                    ? ''
                    : `Please enter a valid ${id}`;
                break;
            case 'phone':
                errors.phone = PHONE_REGEX.test(value)
                    ? ''
                    : 'Please enter a valid phone';
                break;
            case 'email':
                errors.email = EMAIL_REGEX.test(value)
                    ? ''
                    : 'Please enter a valid email';
                break;
            case 'username':
                errors.username = LOGIN_REGEX.test(value)
                    ? ''
                    : 'Username should contain only alphanumeric symbols';
                break;
            case 'password':
                if (value.length < 6) {
                    errors.password = 'Password is too short!';
                } else if (!LOGIN_REGEX.test(value)) {
                    errors.password =
                        'Username should contain only alphanumeric symbols';
                } else {
                    errors.password = '';
                }
                break;
            default:
                break;
        }

        this.setState({ errors, [id]: value });
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        if (this.validateForm()) {
            await this.setState({ loading: true });
            const response = await UserAPI.create(this.state);
            this.setState({ loading: false });

            if(response.error){
                this.handleFailedSubmit(response.error);
            } else {
                this.handleSuccessfulSubmit();
            }
        } else {
            this.props.onRegistrationFail(INVALID_FORM_MESSAGE);
        }
    }

    handleSuccessfulSubmit() {
        this.setState({ loginRedirect: true });
    }

    handleFailedSubmit(response) {
        const errorMessage = response.message;
        const { errors } = this.state;
        if (
            errorMessage.includes(this.state.username) &&
            errorMessage.includes('duplicate')
        ) {
            errors.username = 'Username is already in use';
            this.setState({ errors });
            this.props.onRegistrationFail(INVALID_FORM_MESSAGE);
        } else {
            this.props.onRegistrationFail(errorMessage);
        }
    }

    validateForm() {
        let valid = true;

        inputs.forEach(input => {
            if (input.required && !this.state[input.name]) {
                valid = false;
            }

            if (this.state.errors[input.name]) {
                valid = false;
            }
        });

        return valid;
    }

    render() {
        return (
            <form id="registration-form">
                <p id="form-title">Sign up</p>
                {inputs.map((input, index) => {
                    const { name, required, type } = input;
                    return (
                        <FormInput
                            key={index}
                            label={name}
                            required={required}
                            error={this.state.errors[name]}
                            onChange={this.handleInputChange}
                            type={type}
                        />
                    );
                })}
                <FormButton
                    value="Signup"
                    onClick={this.handleFormSubmit}
                    loading={this.state.loading}
                />
                {this.state.loginRedirect && (
                    <Redirect
                        to={{
                            pathname: '/login',
                            search: 'successfulRegistration=true'
                        }}
                    />
                )}
            </form>
        );
    }
}

const inputs = [
    {
        name: 'firstname',
        required: true,
    },
    {
        name: 'secondname',
        required: true,
    },
    {
        name: 'company',
        required: false,
    },
    {
        name: 'phone',
        required: true,
    },
    {
        name: 'email',
        required: true,
    },
    {
        name: 'username',
        required: true,
    },
    {
        name: 'password',
        required: true,
        type: 'password',
    },
];

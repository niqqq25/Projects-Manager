import * as Yup from 'yup';

const loginFormValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const signupFormValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password is too short'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
});

export { loginFormValidationSchema, signupFormValidationSchema };

import * as Yup from 'yup';

const loginFormValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const signupFormValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(
        6,
        'Password must be at least 6 characters long'
    ),
    email: Yup.string().required('Email is required').email('Email is invalid'),
});

const userEditFormValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name cannot be empty'),
    password: Yup.string().test(
        'check password length',
        'New password must be at least 6 characters long',
        (value) => {
            if (value) {
                return value.length > 5;
            }
            return true;
        }
    ),
});

const projectCreateModalValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
});

const taskCreateModalValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
});

const projectUpdateModalValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title cannot be empty'),
});

const taskUpdateModalValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title cannot be empty'),
});

export {
    loginFormValidationSchema,
    signupFormValidationSchema,
    userEditFormValidationSchema,
    projectCreateModalValidationSchema,
    taskCreateModalValidationSchema,
    projectUpdateModalValidationSchema,
    taskUpdateModalValidationSchema,
};

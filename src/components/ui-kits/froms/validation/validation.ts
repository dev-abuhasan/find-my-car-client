import * as yup from 'yup';

export const user_signin = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password should be of minimum 8 characters length').required('Password is required')
});

export const user_signup = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password should be of minimum 8 characters length').required('Password is required')
});

export const file = yup.object({
    avater: yup.mixed().required('File is required')
});


export const add_car = yup.object({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required'),
    year: yup.string().required('Year is required'),
    color: yup.string().required('Color is required'),
    image: yup.mixed().required('File is required'),
    availableColors: yup.string(),
    categories: yup.string(),
    seats: yup.number().required('Seats is required'),
    price: yup.number().required('Price is required'),
    countInStock: yup.number().required('CountInStock is required'),
    location: yup.string().required('Location is required'),
    offer: yup.object().shape({
        type: yup.string(),
        value: yup.number(),
        expiresAt: yup.date(),
    }),
});
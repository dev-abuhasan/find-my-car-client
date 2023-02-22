import * as yup from 'yup';

export const admin_view_zilla_test = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    zilla: yup.string().required('zilla is required'),
    selectVal: yup.string().required('Value Select is required'),
    addNote: yup.string().required('Add Note is required'),
    terms: yup.boolean().oneOf([true], 'Field must be checked').required('Checkbox must be checked'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required')
});

export const admin_view_file_up_test = yup.object({
    test: yup.mixed().required('File is required')
});
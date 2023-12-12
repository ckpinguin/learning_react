const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Name is required';
    } else if (!values.password) {
        errors.password = 'Password is required';
    }
    return errors;
};

export default validate;
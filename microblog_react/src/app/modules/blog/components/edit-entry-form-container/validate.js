const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Title is required';
    } else if (values.title.length > 128) {
        errors.title = 'Title must be less than 128 characters';
    } else if (values.title.length < 5) {
        errors.title = 'Title must be 5 or more characters long';
    }
    // if (!values.email) {
    //     errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }
    if (!values.text) {
        errors.text = 'Required';
    }
    return errors;
};

export default validate;
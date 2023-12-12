import React from 'react';

import { Field } from 'redux-form';

import './LoginForm.css';

// const  { DOM: { input, textarea } } = React;
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        /**
         *  This local state is totally OK for a presentational
         *  component, because it is UI-related (and needed)
         */
        this.state = {
            errors: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.invalid) {
            this.setState({errors: true});
        } else {
            this.setState({errors: false});
        }
        // Prefill form if asked for...
        if (nextProps.fillForm !== this.props.fillForm) {
            nextProps.initialize(nextProps.fillForm);
        }
    }

    render() {
        const { onSubmit, onCancel, handleSubmit,
                pristine, submitting } = this.props;
        return (
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="form-group">
                    <Field
                        name="name"
                        type="text"
                        label="Name"
                        className="form-control"
                        placeholder="Name eingeben."
                        component={this.renderField}
                    />
                </div>
                <div
                    className="form-group">
                    <Field
                        name="password"
                        type="password"
                        label="Passwort"
                        className="form-control"
                        placeholder="Passwort eingeben."
                        component={this.renderField}                        
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn btn-default"
                        disabled={this.state.errors || submitting || pristine}>Login
                    </button>
                    <button
                        type="button"
                        className="btn btn-default"
                        disabled={submitting}
                        onClick={onCancel}>Abbrechen
                     </button>
                </div>
            </form>
        );
    }
    
    renderField = ({ input, label, className, placeholder,
                       type, meta: { touched, error } }) => (
        <div>
            <label>
                {label}
            </label>
            <div>
                <input
                    {...input}
                    type={type}
                    className={className}
                    placeholder={placeholder}
                />
                {touched && error &&
                    <div
                        className="alert alert-danger error-placeholder">
                        {error}
                    </div>
                }
            </div>
        </div>
    );
}

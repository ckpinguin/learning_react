import React from 'react';
import PropTypes from 'prop-types';

import debug from '../../../../../debug';

import { Field } from 'redux-form';

import './EditEntryForm.css';

export default class EditEntryForm extends React.Component {
    title = 'Edit entry';

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

    componentDidMount() {
        document.title = this.title;
    }

    componentWillUnmount() {
        document.title = '';
    }
    // According to the react docs, the constructor should be preferred to this, 
    // but that doesn't work out for me, it's giving warning about too many
    // updates while re-rendering
    componentWillMount() {
        // initialize form on first rendering
        if (this.props.fillForm) {
            this.props.initialize(this.props.fillForm);
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.invalid) {
            this.setState({errors: true});
        } else {
            this.setState({errors: false});
        }
        // Prefill form if asked for...
        if (nextProps.fillForm !== this.props.fillForm) {
            if (debug) console.log('fillForm prop received: ', nextProps.fillForm);
            nextProps.initialize(nextProps.fillForm);
        }
    }

    render() {
        const { onSubmit, onReset, handleSubmit,
                pristine, submitting } = this.props;
        if (debug) console.log('props: ', this.props);   
        return (
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="hidden">
                    <Field
                        name="id"
                        type="hidden"
                        component={this.renderField} 
                    />
                </div>
                {/* TODO: make this field editable */}
                <div
                    className="hidden">
                    <Field
                        name="author"
                        type="hidden"
                        component={this.renderField}
                    />
                </div>
                <div
                    className="form-group">
                    <Field
                        name="title"
                        type="text"
                        label="Titel"
                        className="form-control"
                        placeholder="Titel eingeben."
                        component={this.renderField}
                    />
                </div>
                <div
                    className="form-group">
                    <Field
                        name="text"
                        label="Inhalt"
                        className="form-control"
                        placeholder="Textinhalt eingeben."
                        component={this.renderTextArea}
                    />
                </div>  
                <div
                    className="form-group">
                    <Field
                        name="image"
                        type="text"
                        label="Bild-URL"
                        className="form-control"
                        placeholder="Bildadresse eingeben."
                        component={this.renderField}
                    />
                </div>  
                <div>
                    <button
                        type="submit"
                        className="btn btn-default"
                        disabled={this.state.errors || submitting || pristine}>Blogeintrag speichern
                    </button>
                    <button
                        type="button"
                        className="btn btn-default"
                        disabled={submitting}
                        onClick={onReset}>Zurücksetzen
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
                    placeholder={placeholder} />
                {touched && error &&
                    <div
                        className="alert alert-danger">
                        {error}
                    </div>}
            </div>
        </div>
    );

    renderTextArea = ({ input, label, className, placeholder,
                          meta: { touched, error } }) => (
        <div>
            <label>
                {label}
            </label>
            <div>
                <textarea
                    {...input}
                    className={className}
                    placeholder={placeholder} />
                {touched && error &&
                    <div
                        className="alert alert-danger">
                        {error}
                    </div>}
            </div>
        </div>
    );
}
EditEntryForm.propTypes = {
    onSubmit:       PropTypes.func.isRequired,
    onReset:        PropTypes.func.isRequired,
    fillForm:       PropTypes.object.isRequired,
    // reduxForm injected by container:
    handleSubmit:   PropTypes.func.isRequired,
    pristine:       PropTypes.bool,
    submitting:     PropTypes.bool
};
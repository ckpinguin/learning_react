import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Blog from '../..';

import './BlogPage.css';

class BlogPage extends React.Component {
    title = 'Blog';

    componentDidMount() {
        document.title = this.title;
    }

    render() {
        const EditEntryFormContainer = Blog.components.EditEntryFormContainer;
        const BlogList = Blog.components.BlogList;
        const { lastEntry, createNewEntry, ...rest } = this.props;
        // const routingProps = {
        //     match: this.props.match,
        //     location: this.props.location,
        //     history: this.props.history
        // };
        // Hide the „new entry“ button if form is shown for the list (new) entry
        const newButtonShow = { display: lastEntry.showForm ? 'none' : 'block' };
        return (
        <div>
            <div
                className="title">
                <h1>
                    {this.title}
                </h1>
            </div>
            <div
                className="mainContent">
                <EditEntryFormContainer
                    entry={lastEntry} />
                <button
                    className="btn"
                    style={newButtonShow}
                    onClick={createNewEntry}>Create New Entry
                </button>
            </div>
            <div
                className="jumbotron">
                <div
                    className="attentionItem">
                    <h2>Attention item</h2>
                    {/*<p>url: {this.props.match.url}</p>
                    <p>path: {this.props.match.path}</p>
                    <p>params: {_.map(this.props.match.params, e => e)}</p>
                    */}
                </div>
            </div>
            <div
                className="listContent">
                <BlogList />
            </div>

        </div>
        );
    }
}

BlogPage.propTypes = {
    // injected by mapStateToProps/mapDispatchToProps:
    createNewEntry:         PropTypes.func.isRequired,
    lastEntry:              PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        lastEntry: Blog.selectors.getLastEntry(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Blog.actions, dispatch);
};

// Some advice was, that explicit literal object shorthand binding
// is better to be more redux-agnostic
export default connect(
     mapStateToProps,
     mapDispatchToProps
)(BlogPage);

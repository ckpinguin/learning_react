import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Blog from '../..';

const BlogList = ({ entries, deleteEntry, editEntry }) => {
    let itemList = [];
    const BlogItem = Blog.components.BlogItem;
    const EditEntryFormContainer = Blog.components.EditEntryFormContainer;
    if (entries) {
        itemList = entries.map((entry) => {
            if (entry !== null && entry.active) {
                return (
                    <div
                        key={entry.id}>
                        <EditEntryFormContainer
                            form={`EditEntryForm_${entry.id}`}
                            entry={entry}
                        />
                        <BlogItem
                            item={entry}
                            onDelete={deleteEntry}
                            onEdit={editEntry}
                        />
                    </div>
                );
            } else {
                return null;
            }
        });
    }

    return (
        <div
            className="BlogList">
            {itemList 
                ? <div>
                      {itemList}
                  </div>
                :
                    <p>No blog entries</p>}
        </div>
    );
};

BlogList.propTypes = {
    // injected by mapStateToProps/mapDispatchToProps:
    entries:                PropTypes.array.isRequired,
    deleteEntry:            PropTypes.func.isRequired,
    editEntry:              PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        entries: Blog.selectors.getAllEntries(state)
    };
};

// Alternative would be:  bindActionCreators(Actions, dispatch);
// where all actions would be bound and available (performance-loss?)
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Blog.actions, dispatch);
};

export default withRouter(connect(
     mapStateToProps,
     mapDispatchToProps,
)(BlogList));

// default behaviour without args would be that `dispatch`
// is injected to be available as a prop:
// connect()(BlogList)
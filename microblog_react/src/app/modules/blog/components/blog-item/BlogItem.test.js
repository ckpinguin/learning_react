import React from 'react';
import ReactDOM from 'react-dom';
import BlogItem from './BlogItem';

const blogItem = {
    id: 0,
    title: 'Mock blog item',
    text: 'Just to test it...',
    image: 'http://logos.com/media/VerseOfTheDay/768x432/2016-12-27.png'
};

it('renders without crashing', () => {
    const mockDelete = () => true;
    const mockEdit = () => true;
    const div = document.createElement('div');
    ReactDOM.render(<BlogItem item={blogItem} onEdit={mockEdit} onDelete={mockDelete} />, div);
});

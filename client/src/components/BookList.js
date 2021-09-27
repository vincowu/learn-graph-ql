import React, { Component } from 'react';
import { gql } from 'apollo-boost';
// binds apollo to react
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

// constructed the query

class BookList extends Component {
    state = {
        highlightedBook: null
    }
    displayBooks() {
        let data = this.props.data;
        if (data.loading) {
            return (<div>Loading books...</div>)
        }
        else {
            return data.books.map(book => {
                return (
                    <li key={book.id} className="book-name" onClick={(event) => { this.setState({ highlightedBook: book.id }) }}>{book.name}</li>
                )
            })
        }
    }

    render() {
        return (
            <div className="book-list">
                <ul className="books">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.highlightedBook} />
            </div>
        )
    }
}

// binds getBooksQuery to BookList
export default graphql(getBooksQuery)(BookList);

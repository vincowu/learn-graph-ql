import { isTerminating } from 'apollo-link/lib/linkUtils';
import React, { Component } from 'react';
// binds apollo to react
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
    displayingBookDetails() {
        const { book } = this.props.data
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>Other Works:</p>
                    <ul>
                        {book.author.books.map(novel => {
                            return <li key={novel.id}>{novel.name}</li>
                        })}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>No Book Selected</h1>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="book-details">
                {this.displayingBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)

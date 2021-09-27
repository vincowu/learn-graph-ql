import React, { Component } from 'react';
import { gql } from 'apollo-boost';
// binds apollo to react
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBooks extends Component {
    state = {
        book: "",
        genre: "",
        authorId: ""
    }
    displayAuthors() {
        // replaces this.props.data because we renamed it
        let data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (
                <option disabled>Loading Authors</option>)
        }
        else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id} className="form-inputs__option" >{author.name}</option>
                )
            })
        }
    }
    submitForm = (event) => {
        event.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.book,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
        //             variables: {
        //     name: this.state.name,
        //     genre: this.state.genre,
        //     authorId: this.state.authorId
        // }
    }

    render() {
        return (
            <form className="form" onSubmit={this.submitForm}>
                <div className="form-field">
                    <label className="form-field__title">Book Name:</label>
                    <input className="form-field__input" onChange={(event) => { this.setState({ book: event.target.value }) }} type="text" name="bookName" />
                </div>
                <div className="form-field">
                    <label className="form-field__title">Genre:</label>
                    <input className="form-field__input" onChange={(event) => { this.setState({ genre: event.target.value }) }} type="text" name="genre" />
                </div>
                <div className="form-field">
                    <label className="form-field__title">Author:</label>
                    <select className="form-inputs" onChange={(event) => { this.setState({ authorId: event.target.value }) }}>
                        <option className="form-inputs__option">Select an author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button className="form-button">Add Book</button>
            </form>
        )
    }
}

// compose is used for multiple queries
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBooks);

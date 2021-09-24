const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

// Takes in object and defines what the book type is all about 
// GraphQL has their own strings and values, therefore, must specifype the types by destructuring graphql package
const BookType = new GraphQLObjectType({
    name: 'Book',
    // adds function here for rendering problems
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, arg) {
                // return _.filter(books, { authorID: parent.id })
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

// dont need to wrap field in root query, because order doesnt matter
const RootQuery = new GraphQLObjectType({
    name: 'RootQuerytType',
    fields: {
        // name of this parameter, when we make a query, querying name will be query 
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            // takes 2 arguments, parent and arg and is code for getting data from db or other source
            // parent comes into play when we are looking at relationships between data
            resolve(parent, args) {
                // return _.find(books, { id: args.id });
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id });
                return Author.findById(args.Id)
            }
        },
        books: {
            // list of books
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            }
        }

    }
})

// book(id: "2"){
//  name
//  genre
// }

// adding, deleting, changing things
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

// defining new schema and defining what schema users on bthe front end can use 
module.exports = new GraphQLSchema({
    query: RootQuery,
    // can perform mutations
    mutation: Mutation
})
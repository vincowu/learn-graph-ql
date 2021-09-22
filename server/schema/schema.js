const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

// Takes in object and defines what the book type is all about 
// GraphQL has their own strings and values, therefore, must specifype the types by destructuring graphql package
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

// dont need to wrap field in root query, because order doesnt matter
const RootQuery = new GraphQLObjectType({
    name: 'RootQuerytType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            // takes 2 arguments, parent and arg and is code for getting data from db or other source
            resolve(parent, args) {
                args.id
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
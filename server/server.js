const express = require('express');
const cors = require('cors');

// allows express to understand graphQL
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();

// allow cross origin request
app.use(cors())

// connect to database
mongoose.connect("mongodb+srv://dbUser:rootroot@cluster0.orpkm.mongodb.net/graphql?retryWrites=true&w=majority");
mongoose.connection.once('open', () => {
    console.log('connected to db')
})

// Middleware to interact with graphQl data, will handle graphQL request
app.use('/graphql', graphqlHTTP({
    schema,
    // uses graphiql tool when we go to this endpoint
    // graphiql: true
}))

app.listen(8080, () => {
    console.log('Listening on port 8080')
});
const express = require('express');
// allows express to understand graphQL
const graphqlHTTP = require('express-graphql')
const app = express();

// Middleware to interact with graphQl data, will handle graphQL request
app.use('/graphql', graphqlHTTP({

}))

app.listen(8080, () => {
    console.log('Listening on port 8080')
})
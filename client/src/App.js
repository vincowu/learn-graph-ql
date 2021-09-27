import './partials/main.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBooks from './components/AddBooks';

// Apollo Client Setup, set it up cause it knows where we are making our requests to
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql/"
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="App">
          <h1>My Reading List</h1>
          <BookList />
          <AddBooks />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;

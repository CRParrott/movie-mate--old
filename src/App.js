import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";  
import { setContext } from '@apollo/client/link/context';

//import local files
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup'


const httpLink = createHttpLink({
    uri: 'localhost:3001/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    uri: httpLink,
    cache: new InMemoryCache(),
  });

  //function to render app goes here
  function App () {
      return (
          <ApolloProvider client={client}>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component ={Login} />
                        <Route exact path ="/signup" component={Signup} />
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
      );
  }

  export default App;
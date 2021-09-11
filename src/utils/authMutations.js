import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser(
        $uname: String!
        $psw: String!
      ) {
        addUser(
          username: $uname
          password: $psw
        ) {
          token
          user {
            _id
          }
        }
    }
`;

export const LOGIN = gql`
  mutation login($uname: String!, $psw: String!) {
    login(username: $uname, password: $psw) {
      token
      user {
        _id
      }
    }
  }
`

import React, {useEffect} from 'react'
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;


const Login = ({show, tokenHandler}) => {

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      tokenHandler(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  const submitCredentials = (event) => {
      event.preventDefault();
      const username = event.target.name.value
      const password = event.target.password.value

      login({variables: {username, password}})
  }

  return (
    <div>
      <form onSubmit={submitCredentials}>
        Name: <input type="text" name="name" /><br/>
        Password: <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login
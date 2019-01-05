import * as React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { LoginMutation, LoginMutationVariables } from '../../schemaTypes';
import { RouteComponentProps } from 'react-router';

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

class RegisterView extends React.Component<RouteComponentProps<{}>> {
  state = {
    email: '',
    password: ''
  };

  handlechange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Mutation<LoginMutation, LoginMutationVariables>
        mutation={loginMutation}
        variables={this.state}
      >
        {login => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={this.handlechange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handlechange}
              />
            </div>
            <div>
              <button
                onClick={async () => {
                  const response = await login();
                  console.log(response);
                  this.props.history.push('/me');
                }}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default RegisterView;

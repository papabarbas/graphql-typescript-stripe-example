import * as React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { RegisterMutation, RegisterMutationVariables } from '../../schemaTypes';
import { RouteComponentProps } from 'react-router';

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
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
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
        variables={this.state}
      >
        {register => (
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
                  const response = await register();
                  this.props.history.push('/login');
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

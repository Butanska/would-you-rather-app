import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Header,
  Form,
  Dropdown,
  Button,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { authUserRequest } from "../actions/authUser";

// Login texts constants object
const LOGINTEXTS = {
  SELECT_FRIEND: "Select a Friend",
  SIGNING_IN: "Signing In",
  WELCOME_MESSAGE: "Welcome to the Would You Rather App!",
  SIGN_IN_TO_CONTINUE: "Please sign in to continue",
  LOGIN_BUTTON: "Login",
};

const Login = ({ users, authUserRequest }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getUsers = () => {
    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }));
  };

  const onChange = (e, { value }) => {
    setValue(value);
  };

  const handleLoading = () => {
    setLoading(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    new Promise((res) => {
      handleLoading();
      setTimeout(() => res(), 1000);
    }).then(() => authUserRequest(value));
  };

  const getLoader = () => {
    return loading ? (
      <Dimmer active inverted>
        <Loader inline="centered">{LOGINTEXTS.SIGNING_IN}</Loader>
      </Dimmer>
    ) : null;
  };

  const getHeader = () => {
    return (
      <div className="loginHeader">
        <Header as="h4" block attached="top" textAlign="center">
          <p>{LOGINTEXTS.WELCOME_MESSAGE}</p>
          <p>{LOGINTEXTS.SIGN_IN_TO_CONTINUE}</p>
        </Header>
      </div>
    );
  };

  const renderContent = () => {
    const disabled = value === "";
    return (
      <div className="dropdown">
        {getLoader()}
        <Form onSubmit={handleSubmit}>
          <Dropdown
            placeholder={LOGINTEXTS.SELECT_FRIEND}
            required
            fluid
            selection
            scrolling
            options={getUsers()}
            value={value}
            onChange={onChange}
          />
          <Button
            content={LOGINTEXTS.LOGIN_BUTTON.toUpperCase()} // Transform text to uppercase
            color="blue"
            disabled={disabled}
            fluid
          />
        </Form>
      </div>
    );
  };

  return (
    <div className="loginPage">
      {getHeader()}
      {renderContent()}
    </div>
  );
};

function mapStateToProps({ getUsers }) {
  return {
    users: Object.values(getUsers),
  };
}

export default connect(mapStateToProps, { authUserRequest })(Login);

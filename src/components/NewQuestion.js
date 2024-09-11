import React, { useState } from 'react';
import { Form, Header, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleSaveQuestion } from '../actions/questions';

// Text constants object
const TEXTS = {
  CREATE_QUESTION: 'Creating Question',
  NEW_POLL_HEADER: 'Create New Poll',
  NEW_POLL_SUBHEADER: 'Would you rather',
  FIRST_OPTION_PLACEHOLDER: 'Enter first option...',
  SECOND_OPTION_PLACEHOLDER: 'Enter second option...',
  SUBMIT_BUTTON: 'Submit'
};

const NewPoll = ({ authUser, handleSaveQuestion }) => {
    const [submitSuccessful, setSubmitSuccessful] = useState(false);
    const [options, setOptions] = useState({ option1: '', option2: '' });
    const [loading, setLoading] = useState(false);

    const handleLoading = () => {
        setLoading(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { option1, option2 } = options;
        handleLoading();
        
        await new Promise(resolve => {
          handleSaveQuestion(option1, option2, authUser);
          setTimeout(resolve, 1000);
        });
        
        setOptions({ option1: '', option2: '' });
        setSubmitSuccessful(true);
      };

    const handleChange = e => {
        const { id, value } = e.target;
        setOptions(prevOptions => ({ ...prevOptions, [id]: value }));
    };

    const getLoader = () => {
        return loading ? (
            <Dimmer active inverted>
                <Loader inline='centered'>{TEXTS.CREATE_QUESTION}</Loader>
            </Dimmer>
        ) : null;
    };

    const disabled = options.option1 === '' || options.option2 === '';

    if (submitSuccessful) {
        return <Redirect to="/" />;
    }

    return (
        <div className="new-poll">
            {getLoader()}
            <Header as="h3">{TEXTS.NEW_POLL_HEADER}</Header>
            <Header as="h4">{TEXTS.NEW_POLL_SUBHEADER}</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <input
                        id="option1"
                        placeholder={TEXTS.FIRST_OPTION_PLACEHOLDER}
                        value={options.option1}
                        onChange={handleChange}
                        required />
                </Form.Field>
                <p>Or</p>
                <Form.Field>
                    <input
                        id="option2"
                        placeholder={TEXTS.SECOND_OPTION_PLACEHOLDER}
                        value={options.option2}
                        onChange={handleChange}
                        required />
                </Form.Field>
                <Form.Button
                    type='submit'
                    color='green'
                    disabled={disabled}>
                    {TEXTS.SUBMIT_BUTTON}
                </Form.Button>
            </Form>
        </div>
    );
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll);
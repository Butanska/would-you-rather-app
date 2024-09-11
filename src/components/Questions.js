import React, { useState } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleSaveQuestionAnswer } from '../actions/users';
import { optionOne, optionTwo } from './constants';

const QuestionPoll = ({ authUser, question, handleSaveQuestionAnswer }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleInputChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const setOption = () => {
        if (selectedOption) {
            handleSaveQuestionAnswer(authUser, question.id, selectedOption);
        }
    };

    const renderAnswer = (option, answerText) => (
        <>
            <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedOption === option}
                onChange={handleInputChange}
            />
            <label className='radio-label'>{answerText}</label>
        </>
    );

    if (!question) {
        return <div>This poll doesn't exist!!!</div>;
    }

    return (
        <div className="poll">
            <div className="poll-right">
                <Header as="h5">Would you rather</Header>
                <div className="question-form">
                    {renderAnswer(optionOne, question.optionOne.text)}
                    <br />
                    {renderAnswer(optionTwo, question.optionTwo.text)}
                    <br />
                    <div className='submit-answer'>
                        <Button
                            color='blue'
                            disabled={!selectedOption}
                            onClick={setOption}
                        >Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(QuestionPoll);
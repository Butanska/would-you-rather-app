import React from "react";
import { Header, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TeaserPoll from './Answered';
import QuestionPoll from './Questions';
import ResultPoll from './Results';
import Error from './Error';

const UserInfo = ({ question, unanswered, typeOfUserCard, author, errorPage }) => {

    const renderPoll = () => {
        switch (typeOfUserCard) {
            case 'TEASER_POLL':
                return <TeaserPoll question={question} unanswered={unanswered} author={author} />;
            case 'QUESTION_POLL':
                return <QuestionPoll question={question} />;
            case 'RESULT_POLL':
                return <ResultPoll question={question} />;
            default:
                return null;
        }
    };

    if (errorPage) {
        return <Error />;
    }

    return (
        <div className="userInfo">
            <Header as="h5">{author.name} asks:</Header>
            <div className="userInfo-layout">
                <div className="userInfo-wrapper">
                    <div className="column4">
                        <Image src={author.avatarURL} size='medium' avatar />
                    </div>
                    <div className="column8">
                        {renderPoll()}
                    </div>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps({ getUsers, getQuestions, authUser }, { match, question_id }) {
    let question, author, typeOfUserCard, errorPage = false;

    if (question_id !== undefined) {
        question = getQuestions[question_id];
        author = getUsers[question.author];
        typeOfUserCard = 'TEASER_POLL';
    } else {
        const {question_id} = match.params;
        question = getQuestions[question_id];
        const user = getUsers[authUser];

        if (!question) {
            errorPage = true;
        } else {
            author = getUsers[question.author];
            typeOfUserCard = 'QUESTION_POLL';
            const userHasAnswered = user.answers.hasOwnProperty(question.id);
            if (userHasAnswered) {
                typeOfUserCard = 'RESULT_POLL';
            }
        }
    }
    return {question, author, typeOfUserCard, errorPage};

}

export default connect(mapStateToProps)(UserInfo);

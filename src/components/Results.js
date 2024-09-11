import React from 'react';
import { Header, Item, Label, Progress, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { optionOne, optionTwo } from './constants';

const ResultPoll = ({ question, user, history }) => {

    const handleBackClick = () => {
        history.push('/');
    };

    
    const getVoteLabel = (userVote, option) => {
        if (userVote === option) {
            return (
                <Label 
                    className="vote-ribbon"
                    color='blue' ribbon>Your Vote</Label>
            );
        }
        return null;
    };

    const TEXTS = {
        RESULTS_HEADER: 'Results:',
        WOULD_YOUR_RATHER: 'Would you rather',
        YOUR_VOTE: 'Your Vote',
        VOTES_LABEL: 'votes',
        BACK_BUTTON: 'Back',
      };

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

  return (
        <div className="poll">
            <div className="poll-right">
                <Header as="h4">{TEXTS.RESULTS_HEADER}</Header>
                <Header as="h5">{TEXTS.WOULD_YOUR_RATHER}</Header>
                <Item className="result-block">
                    {getVoteLabel(userVote, optionOne)}
                    <p>{question.optionOne.text}</p>
                    <Progress 
                      percent={((optionOneVotes / totalVotes) * 100).toFixed(2)}
                      progress>
                        {optionOneVotes} {TEXTS.VOTES_LABEL} out of {totalVotes} {TEXTS.VOTES_LABEL}
                    </Progress>
                </Item>
                <Item className="result-block">
                    {getVoteLabel(userVote, optionTwo)}
                    <p>{question.optionTwo.text}</p>
                    <Progress 
                      percent={((optionTwoVotes / totalVotes) * 100).toFixed(2)}
                      progress>
                        {optionTwoVotes} {TEXTS.VOTES_LABEL} out of {totalVotes} {TEXTS.VOTES_LABEL}
                    </Progress>
                </Item>
                <Button position='right' onClick={handleBackClick}>
                    {TEXTS.BACK_BUTTON}
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ getUsers, authUser }) => {
    const user = getUsers[authUser];
    return { user };
};

export default withRouter(connect(mapStateToProps)(ResultPoll));
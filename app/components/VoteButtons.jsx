const React = require('react');
const { Button, Header } = require('semantic-ui-react')
/* takes a prop 'label' and gets the other props from store via VoteContainer
  and returns a div containing the label, vote buttons, and vote summary */
const VoteButtons = function({ label, onUpvote, onDownvote, voteScore, voteCount }) {
  return (
    <div>

      <Header as='h2'>{label}</Header>

      <Button alt="upvote" onClick={onUpvote}>&uarr;</Button> &nbsp;
      <Button alt="downvote" onClick={onDownvote}>&darr;</Button>

      <p>Score: {voteScore || 0} out of {voteCount || 0 } total votes!</p>

    </div>
  );
}

module.exports = VoteButtons;

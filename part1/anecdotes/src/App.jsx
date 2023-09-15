import { useState } from 'react'

const Display = ({ anecdotes, selected }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected].text}
      </p>
      <p>
        has {anecdotes[selected].votes} votes
      </p>
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
};

const Statistics = ({ anecdotes, mostVoted, setMostVoted }) => {
  Object.values(anecdotes).forEach((anecdote, index) => {
    console.log(anecdote);
    if (anecdote.votes > anecdotes[mostVoted].votes) {
      setMostVoted(index);
    }
  });
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[mostVoted].text}
      </p>
    </>
  );
};

const getAnedotes = () => ({
  0: {
    text: 'If it hurts, do it more often.',
    votes: 0
  },
  1: {
    text: 'Adding manpower to a late software project makes it later!',
    votes: 0,
  },
  2: {
    text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
  },
  3: {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
  },
  4: {
    text: 'Premature optimization is the root of all evil.',
    votes: 0,
  },
  5: {
    text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
  },
  6: {
    text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 0,
  },
  7: {
    text: 'The only way to go fast, is to go well.',
    votes: 0,
  }
});

function App() {
  const anecdotesObj = getAnedotes();
  const random = () => Math.floor(Math.random() * Object.keys(anecdotesObj).length);
  const [selected, setSelected] = useState(random());
  const [anecdotes, setAnecdotes] = useState(anecdotesObj);
  const [mostVoted, setMostVoted] = useState(0);

  const setRandom = () => {
    setSelected(random());
  };

  const vote = () => {
    console.log('voted for ', selected);
    setAnecdotes({
      ...anecdotes,
      [selected]: {
        ...anecdotes[selected],
        votes: anecdotes[selected].votes + 1
      }
    });
  };

  return (
    <>
      <Display anecdotes={anecdotes} selected={selected} />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={setRandom} text="next anecdote" />
      <Statistics anecdotes={anecdotes} mostVoted={mostVoted} setMostVoted={setMostVoted} />
    </>
  )
}

export default App

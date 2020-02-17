import React from 'react';
import './App.css';
import {GetRandomNumbers} from './Utilities'
import {RequestToJishoAPI} from './Utilities'

class WordSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {searchKey: "n5", words: [], question: ""};

    const allWords = RequestToJishoAPI(this.state.searchKey);
    setTimeout(() => {
      console.log(allWords);
      //Amount of answers to show up
      var amountOfAnswers = 4;
      console.log("amount of answers:" + amountOfAnswers);
      const randomAnswers = GetRandomNumbers(0, allWords.length - 1, amountOfAnswers);
      //we will put our 4 answers in here and pass to the state
      var chosenAnswers = [];
      //set the question and answer
      this.setState(state => ({question: allWords[randomAnswers[0]].senses[0].english_definitions[0]}));
      for (let i = 0; i < amountOfAnswers; i++) {
          chosenAnswers.push(allWords[randomAnswers[i]].slug + " (" + allWords[randomAnswers[i]].japanese[0].reading + ")");
      }
      console.log("chosen answers: " + chosenAnswers);
      this.setState(state => ({words: chosenAnswers}));
    }, 2000);
  }

  

  render() {
  const wordLists = this.state.words.map((wrd, i) => <li key={i}>{wrd.toString()}</li>);
  return(<div>
  <div>Question: {this.state.question}</div>
  <div><fieldset><legend>Words:</legend><ul>{wordLists}</ul></fieldset></div>
  </div>);
  }
}



function App() {
  return (
    <div className="App">
      <div><WordSearch/></div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

class WordSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {api: "https://jisho.org/api/v1/search/words?keyword=", searchKey: "n5", words: [], question: ""};

    this.handleSubmit = this.handleSubmit.bind(this);

    const url='https://cors-anywhere.herokuapp.com/jisho.org/api/v1/search/words?keyword=' + this.state.searchKey;
    const wordList = [];

    fetch(url).then(response=> {
      return response.json()
    }) // fetch the api data and push the objects to wordList array
    .then(data => {
      for (let i = 0; i < data.data.length; i++) {
        wordList.push(data.data[i]);
      }
      //only want 4 answers to show up
      var amountOfAnswers = 4 < wordList.length ? 4 : wordList.length;
      //use get random numbers function to get 4 random numbers in the word list
      var randomAnswers = GetRandomNumbers(0, wordList.length - 1, amountOfAnswers);
      // get 3 random answers
      this.setState(state=> ({question: wordList[randomAnswers[0]].senses[0].english_definitions[0]}));
      for (let i = 0; i < amountOfAnswers; i++) {
        this.setState(state => {words: this.state.words.push(wordList[randomAnswers[i]].slug)});
      }
      console.log(this.state.words);
    })
    .catch(err=>{
      alert("error")
    })
  }
  handleSubmit(e) {
    console.log(this.state.words);
    this.forceUpdate();
  }

  

  render() {
  const wordLists = this.state.words.map((wrd, i) => <li key={i}>{wrd.toString()}</li>);
  return(<div><button onClick={this.handleSubmit}>Show Answers</button>
  <div>Question: {this.state.question}</div>
  <div><fieldset><legend>Words:</legend><ul>{wordLists}</ul></fieldset></div></div>);
  }
}
// A function that gets a the lowest number, the highest number possible, and the amount of numbers
// you want to return in that range (ie. 4 unique numbers from 1-10 )
function GetRandomNumbers(minNum, maxNum, amountOfNum = 1, allowDuplicates = false) {
  var numsToReturn = [];
  if(allowDuplicates) {
    for (let i = 0; i < amountOfNum; i++) {
         numsToReturn.push(Math.round((minNum + maxNum) * Math.random()));
    }
  } // if no duplicates allowed
  else {
    for (let i = 0; i < amountOfNum; i++) {
      if(numsToReturn.length === 0) {
        numsToReturn.push(Math.round((minNum + maxNum) * Math.random()));
      } else {
        var num = Math.round((minNum + maxNum) * Math.random());
        for (let j = 0; j < numsToReturn.length; j++) {
          if(num === numsToReturn[j]) {
            while(num === numsToReturn[j]) {
              num = Math.round((minNum + maxNum) * Math.random());
            }
          }
        }
        numsToReturn.push(num);
      }
    }
  }
  return numsToReturn;
}


function App() {
  return (
    <div className="App">
      <div><WordSearch/></div>
    </div>
  );
}

export default App;

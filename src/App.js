import React from 'react';
import logo from './logo.svg';
import './App.css';

class WordSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {word: "https://jisho.org/api/v1/search/words?keyword=", searchKey: "fish", words: [], question: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    //alert(this.state.word + this.state.searchKey);
    //this.state.words = test();

  const url='https://cors-anywhere.herokuapp.com/jisho.org/api/v1/search/words?keyword=' + this.state.searchKey;
  const wordList = [];

  fetch(url).then(response=> {
    return response.json()
  }) // fetch the api data and push the objects to wordList array
  .then(data => {
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      wordList.push(element);
    }

    //only want 4 answers to show up
    var amountOfAnswers = 4 < wordList.length ? 4 : wordList.length;
    //use get random numbers function to get 4 random numbers in the word list
    var randomAnswers = GetRandomNumbers(0, wordList.length-1, 4);
    //get correct answer
    this.setState(state => {words: this.state.words.push(wordList[0].slug)});
    // get 3 random answers
    for (let i = 0; i < amountOfAnswers - 1; i++) {
      this.setState(state => {words: this.state.words.push(wordList[randomAnswers[i]].slug)});
    }
    this.setState(state=> ({question: wordList[0].senses[0].english_definitions[0]}));
    console.log(wordList[0].senses[0].english_definitions[0]);
  })
  .catch(err=>{
    alert("error")
  })
  }

  handleChange(e) {
    this.setState({searchKey: e.target.value})
  }

  render() {
    const wordLists = this.state.words.map((wrd, i) => <li key={i}>{wrd.toString()}</li>);
    // return(<form>
    //   <label>Word to search: <input value={this.state.searchKey} type="text" onChange={this.handleChange}></input></label>
    //   <button onClick={test}>Http Request</button>
    //   <button type="submit">Search</button>
    // </form>);
  displayVarToConsole(this.state.words);
  return(<div><button onClick={this.handleSubmit}>Http Request</button>
  <div>Question: {this.state.question}</div>
  <div><fieldset><legend>Words:</legend><ul>{wordLists}</ul></fieldset></div></div>);
  }
}

function displayVarToConsole(obj) {
  console.log("Object content:" + obj);
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

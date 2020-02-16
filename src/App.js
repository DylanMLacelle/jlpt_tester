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
  })
  .then(data => {
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      wordList.push(element);
      this.setState(state => {words: this.state.words.push(wordList[i].slug)});
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
    const test = this.state.words[0];
    // return(<form>
    //   <label>Word to search: <input value={this.state.searchKey} type="text" onChange={this.handleChange}></input></label>
    //   <button onClick={test}>Http Request</button>
    //   <button type="submit">Search</button>
    // </form>);
  displayVarToConsole(this.state.words);
  return(<div><button onClick={this.handleSubmit}>Http Request</button>
  <div>Question: {this.state.question}</div>
  <div><fieldset><legend>Words:</legend><ul>{wordLists}</ul></fieldset>
  <div>{test}{this.state.words.length}</div></div></div>);
  }
}

function displayVarToConsole(obj) {
  console.log("Object content:" + obj);
}

function test() {
  const url='https://cors-anywhere.herokuapp.com/jisho.org/api/v1/search/words?keyword=dog';
  const words = [];

  fetch(url).then(response=> {
    return response.json()
  })
  .then(data => {
    console.log(data);
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      words.push(element.toString());
    }
  })
  .catch(err=>{
    alert("error")
  })

  return words;
}


function App() {
  return (
    <div className="App">
      <div><WordSearch/></div>
    </div>
  );
}

export default App;

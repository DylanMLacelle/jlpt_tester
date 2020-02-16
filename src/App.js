import React from 'react';
import logo from './logo.svg';
import './App.css';

class WordSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {word: "https://jisho.org/api/v1/search/words?keyword=", searchKey: "dog", words: []};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    //alert(this.state.word + this.state.searchKey);
    //this.state.words = test();

  const url='https://cors-anywhere.herokuapp.com/jisho.org/api/v1/search/words?keyword=dog';
  const wordList = [];

  fetch(url).then(response=> {
    return response.json()
  })
  .then(data => {
    console.log(data);
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      wordList.push(element);
    }
    this.setState(state => {words: this.state.words.push(wordList[2].slug)})
    console.log(this.state.words);
  })
  .catch(err=>{
    alert("error")
  })
  console.log("After loop: " + this.state.words);
  }

  handleChange(e) {
    this.setState({searchKey: e.target.value})
  }

  render() {
    const wordLists = this.state.words.map((wrd) => <li>{wrd.toString()}</li>);
    // return(<form>
    //   <label>Word to search: <input value={this.state.searchKey} type="text" onChange={this.handleChange}></input></label>
    //   <button onClick={test}>Http Request</button>
    //   <button type="submit">Search</button>
    // </form>);
    
  return(<div><button onClick={this.handleSubmit}>Http Request</button>
  <div><fieldset><legend>Words:</legend><ul>{wordLists.toString()}</ul></fieldset></div></div>);
  }
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
    return words;
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

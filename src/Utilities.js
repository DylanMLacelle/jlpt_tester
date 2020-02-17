// A function that gets a the lowest number, the highest number possible, and the amount of numbers
// you want to return in that range (ie. 4 unique numbers from 1-10 )
export function GetRandomNumbers(minNum, maxNum, amountOfNum = 1, allowDuplicates = false) {
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

// A function for calling to an api with a requested term
export function RequestToJishoAPI(wordKey) {
  const url='https://cors-anywhere.herokuapp.com/jisho.org/api/v1/search/words?keyword=' + wordKey;
  var wordList = [];
  
  fetch(url).then(response=> {
    return response.json()
  }) // fetch the api data and push the objects to wordList array
  .then(data => {
    for (let i = 0; i < data.data.length; i++) {
      wordList.push(data.data[i]);
    }
  })
  .catch(err=>{
    alert("error retrieving from jisho api: " + url)
  })
  return wordList;
}
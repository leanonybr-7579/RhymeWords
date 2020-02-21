let input = document.querySelector(".TextBox")//
let button = document.querySelector(".Button")//
let h2 = document.querySelector(".Words")//
let button2 = document.querySelector(".Button2")

button.addEventListener("click", function(){
  function check(res){
    if(!res){
      h2.style.left = "510px"
      h2.style.top = "200px"
      h2.innerHTML = "Error: couldn't find the items<br><br> you are searching for!"
      return
    }

    if(!res.length){
      h2.style.left = "510px"
      h2.style.top = "200px"
      h2.innerHTML = "Nothing found, try again or later!"
      return
    }

    let wordList = []
    let counter = 1

    for(let i = 0; i<Math.min(res.length, 10); i++){
      wordList.push(`${counter}. ${res[i].word} <br><br>`)
      counter++;
    }
    h2.style.left = "510px"
    h2.style.top = "200px"
    wordList = wordList.join(" ")
    h2.innerHTML = `You may be interested in: <br><br> ${wordList}`
  }

  async function fetchCall(){
    const url1 = "https://api.datamuse.com/words"
    const url2 = "?sl="
    const url3 = input.value
    const urlTotal = `${url1}${url2}${url3}`
    
    try{
      const response = await fetch(urlTotal)
      if(response.ok){
        const jsonResponse = await response.json()
        check(jsonResponse)
      }
      throw new Error('Request failed!')
    }catch(error){
      console.log(error.message)
    }
  }

  fetchCall()
})

input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    button.click()
  }
});

button2.addEventListener("click", function(){

  if(input.value != ""){
    input.value = ""
  }
  h2.innerHTML = "The results will be showed here"
  h2.style.left = "510px";
  h2.style.top = "350px";
})

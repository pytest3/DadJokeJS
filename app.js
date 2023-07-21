let vDOM = [];
const endpoint = "https://icanhazdadjoke.com/";
let jokes = [];
let initialRender = true;

function createVDOM() {
  return [
    MainHeader("Dad jokes generator"),
    ButtonsWrapper(
      AddJokeButton("Get a random joke", fetchJoke, "get-button"),
      DeleteJokeButton("Delete a joke", deleteJoke, "delete-button")
    ),
    ListHeader("Jokes:", jokes.length === 0),
    ListOfJokes(),
  ];
}

function ButtonsWrapper(...args) {
  const jsActionsWrapper = document.createElement("div");
  jsActionsWrapper.replaceChildren(...args);
  jsActionsWrapper.classList.add("buttons-wrapper");
  return jsActionsWrapper;
}

function ListOfJokes() {
  function createJokeComponent(joke) {
    const ele = document.createElement("li");
    ele.textContent = joke;
    return ele;
  }
  const jsLiJokes = jokes.map(createJokeComponent);
  const jsUlList = document.createElement("ul");
  jsUlList.classList.add("JokesList");
  jsUlList.replaceChildren(...jsLiJokes);
  return jsUlList;
}

function createTextComponent(tag, conditionalHide) {
  function jsElement(text) {
    const jsTextComponent = document.createElement(tag);
    jsTextComponent.textContent = text;
    return jsTextComponent;
  }

  if (conditionalHide) {
    return function (text, condition) {
      if (condition) {
        const jsDiv = document.createElement(tag);
        jsDiv.textContent = "Grab a joke!";
        return jsDiv;
      } else {
        const jsTextComponent = document.createElement(tag);
        jsTextComponent.textContent = text;
        return jsTextComponent;
      }
    };
  }

  return jsElement;
}

const MainHeader = createTextComponent("h1");
const ListHeader = createTextComponent("h3", true);

function createButtonComponent() {
  return function (text, handler, className) {
    const jsButton = document.createElement("button");
    jsButton.textContent = text;
    if (handler) {
      jsButton.onclick = handler;
    }
    if (className) {
      jsButton.classList.add(className);
    }
    return jsButton;
  };
}

const AddJokeButton = createButtonComponent();
const DeleteJokeButton = createButtonComponent();

ButtonsWrapper(
  AddJokeButton("Get a random joke", fetchJoke),
  DeleteJokeButton("Delete a joke", deleteJoke)
);

async function fetchJoke() {
  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
  });
  const jokeData = await response.json();
  jokes.push(jokeData.joke);
  console.log(jokes);
  dataToView();
}

function deleteJoke() {
  jokes.pop();
  dataToView();
}

function dataToView() {
  if (initialRender) {
    vDOM = createVDOM();
    document.body.replaceChildren(...vDOM);
    initialRender = false;
    return;
  }

  const prevDOM = [...vDOM];
  const currDOM = createVDOM();

  for (let i = 0; i < currDOM.length; i++) {
    if (prevDOM[i].isEqualNode(currDOM[i])) {
      continue;
    } else {
      console.log(i);

      console.log(prevDOM[i]);
      console.log(currDOM[i]);
      if (currDOM[i].hasChildNodes()) {
        vDOM[i].innerHTML = currDOM[i].innerHTML;
      } else {
        vDOM[i].textContent = currDOM[i].textContent;
      }
    }
  }
}

// dataToView();
window.requestAnimationFrame(dataToView());

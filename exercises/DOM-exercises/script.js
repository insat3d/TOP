const container = document.querySelector("#container");

const para = document.createElement("p");
para.textContent = "Hi, I am red!";
para.style.color = "Red";
container.appendChild(para);

const subhead = document.createElement("h3");
subhead.textContent = "I'm a blue h3!";
subhead.style.color = "Blue";
container.appendChild(subhead);

const divBorder = document.createElement("div");
const dbH1 = document.createElement("h1");
const dbPara = document.createElement("p");
dbH1.textContent = "I'm in a div";
dbPara.textContent = "ME TOO!";
divBorder.style.border = "2px solid black";
divBorder.style.backgroundColor = "Pink";
divBorder.appendChild(dbH1);
divBorder.appendChild(dbPara);
container.appendChild(divBorder);

const btn2 = document.querySelector("#btn2");
btn2.onclick = () => alert("clicked again");
btn2.onclick = () => alert("thrid time");

const btn3 = document.querySelector("#btn3");
// btn3.addEventListener("click", () => {
//   alert("event listened");
// });

function alertFunction() {
  alert("YAY! YOU DID IT!");
}

btn3.addEventListener("click", function (e) {
  console.log(e);
});

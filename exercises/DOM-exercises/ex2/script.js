/* JavaScript DOM Exercises 01 Tutorial: https://youtu.be/EHF7xBUAmrQ */

const pTag = document.querySelector('p');
const pText = pTag.textContent;
const hTag = document.querySelector('h1');

/*
  Exercise 01
  -----------
  Highlight all of the words over 8 characters long in the paragraph text (with a yellow background for example)
*/
const spanOpen = "<span class='highlighted'>";
const spanClose = '</span>';
const regex = /\b(\w{8,})\b/gm;
const subst = `${spanOpen}$&${spanClose}`;
const result = pText.replace(regex, subst);
document.querySelector('p').innerHTML = result;

/*
  Exercise 02
  -----------
  Add a link back to the source of the text after the paragraph tag.
  (https://forcemipsum.com/)
*/
const aTag = document.createElement('a');
aTag.href = 'https://forcemipsum.com';
const aText = document.createTextNode('Source');
aTag.appendChild(aText);
pTag.insertAdjacentElement('afterend', aTag);

/*
  Exercise 03
  -----------
  Split each new sentence on to a separate line in the paragraph text.
  A sentence can be assumed to be a string of text terminated with a period (.)
*/

// const regex2 = /(\.|\?|\!)\s/gm;
// const newLine = '<br>';
// const subst2 = `$&${newLine}`;
// document.querySelector('p').innerHTML +=
//   '<br> <br>' + pText.replace(regex2, subst2);

/* 
  Exercise 04
  -----------
  Count the number of words in the paragraph tag and display the count afer the heading.
  You can assume that all words are separated by one singular whitespace.
*/
const regex3 = /\s+/gm;
const wordCount = pText.split(regex3).reduce((acc, cur) => {
  return cur.length > 0 ? ++acc : acc;
}, 0);
const pTagWordCount = document.createElement('h5');
pTagWordCount.textContent = `Word Count: ${wordCount}`;
hTag.insertAdjacentElement('afterend', pTagWordCount);

/*
  Exercise 05
  -----------
  Replace all question marks (?) with thinking faces (🤔) and exclamation marks (!) with astonished faces (😲) 
 */
// const regex4 = /(\?)|(\!)/gm;
// function emoji(p1, p2) {
//   if (p1) {
//     return '🤔';
//   }
//   if (p2) {
//     return '😲';
//   }
// }

// const regex2 = /(\.|\?|\!)\s/gm;
const subst2 = `$&<br>`;
// const replacedText = pText.replace(regex2, subst2);

document.querySelector('p').innerHTML = pText
  .replace(/(\.)\s/g, subst2)
  .replace(/\?/g, '🤔')
  .replace(/\!/g, '😲');

// document.querySelector('p').innerHTML +=
//   '<br> <br>' + replacedText.replace(regex4, emoji);

# Dad jokes generator

- Created using vanilla JS, HTML and CSS
- A virtual DOM is created in JS and diffed against previous DOM using a diffing algo to find out what changed. This makes the app faster as instead of updating the full DOM whenever something changes on the webpage, only the changed element is updated
- The virtual DOM enables semi-visual coding which is similar to HTML where you can see and rearrange the elements on the webpage just by editing the virtual DOM all from within JS
- We also implemented and restricted ourselves to one way data binding here where everything you see on the webpage corresponds to underlying data in JS, which in this case is the virtual DOM array in JS. Every user action will update the underlying JS data before it's updated in the DOM and through render and layout engine, show up on the page

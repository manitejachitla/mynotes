---
sidebar_position: 1
---

# Styling 4 ways 

### Global Styles

1. Create a .css file in /styles folder and import it in _app.js 
2. importing in _app.js will apply styling to all folders as _app.js is a wrapper to all our components

### Component Level Styles

1. Create a [name].module.css file in styles folder, here "module.css" file type is important for component level styling
2. Now import that file in any component with name and add it as a className to style object

````css
/*
.home.module.css
*/
.redh1{
  color: red;
}

````

````jsx
// component
import styles from '../styles/Home.module.css'
function About(){
    return <h1 className={styles.redh1}>About page</h1>
}
export default About

````

### SASS Support

1. install sass using "yarn add sass"
2. you can now create and use sass& scss files with [name].modules.scss extension and use them


### CSS in JS

1. Next Also Supports Inline Styles 
2. but it's not recommended to use inline styles you can use styled components for this
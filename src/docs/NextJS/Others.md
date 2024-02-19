### Layout
1. to add header and footer or any other layout component to every page in our application, create layout js files and add them in _app.js
2. as _app.js is responsible for rendering every component in our page

```jsx
//_app.js
import '../styles/globals.css'
import Header from "../components/header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </>
  )
}

export default MyApp

`````

3. Here Every Page in our app will have header and footer components wrapped with header and footer
4. However some pages doesn't need layout like "signup" || "login", where only the compnent should be rendered
5.  This case can be handled like this
6.  Define a property on component without layout like "showComponentOnly"

````jsx

function About(){
    return <h1 className={styles.redh1}>About page</h1>
}

About.getComponent=true
export default About;

````

7. Now check in _app.js if Component.getComponent exits and return component Accordingly

`````jsx

import '../styles/globals.css'
import Header from "../components/header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {

    if (Component.getComponent){
        return <Component {...pageProps}/>
    }
  return (
      <>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </>
  )
}

export default MyApp

`````


### Head Component
1. Head Component is inbuilt next js function and used to dynamically handle head section of html document which is important for SEO
2. Head component is used to modify head section of HTML


````jsx
//code
import Head from 'next/head'
function Profile(){
    return (
        <>
            <Head>
                <title>Profile Page</title>
                <meta name={'description'} content={'This is Profile Page of user'}/>
            </Head>
            <h1>Profile page</h1>
        </>
    )
}

export default Profile;
````
3. index.js already has some tags defined in "Head" and they have more priority than individual components
4.  Head tag supports dynamic values for title and description as it's a simple JSX.



### Image Component
1. Image Component Will Automatically Converts Image to smaller size and better format
2. Image Component will add lazy loading automatically
3. Place Holder Image will be rendered until actual image is loaded just by adding one more prop, as this avoids layout shifts

````jsx
import Image from 'next/image'

function PetsPage() {
  return (
    <div>
        // for showing blurred image
        <Image src={'1.jpg'} placeholder={'blur'} alt={}/>
      {['1', '2', '3', '4', '5'].map(path => {
        return (
          <div key={path}>
            <Image src={`/${path}.jpg`} alt='pet' width='280' height='420' />
          </div>
        )
      })}
    </div>
  )
}

export default PetsPage
````


### TypeScript Support
1. Next js provides inbuilt typescript support
2. create a empty tsconfig.json file in project root and install neccessary packages "typescript && @types/react"
3. restart the server 
4. Now nextjs automatically populates tsconfig.json file with required props

### Redirects
1. this is usefull when your site url is changed or maintainance in some pages
2. redirects can be added in next.config.js as follows
3. 308 response code is thrown on source if redirect is permanent and 307 if permanent is false
4. you can use dynamic paths  

```jsx
module.exports = {
  reactStrictMode: true,
  redirects:async ()=>{
    return [
      {
        source:'/about',
        destination:'/',
        permanent:true
      },
        {
            source:'/old-blog/:id',
            destination:'/new-blog/:if',
            permanent:true
        }
    ]
  }
}

```


### environment variables
1. add .env files with key value pair and you can access them using "process.env"
2. env values will be exposed only in server side not in server side
3. to add keys that should exposable to public add "NEXT_PUBLIC" prefix to variable key 
``` NEXT_PUBLIC_ANALYTICS_ID=123 ```
### Authentication 

1. User Identity & User Access
2. this auth exists in client side,server side And API routes
3. we use "next-auth" package
4. create a file [...nextauth].js in /pages/api/auth


```js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
})

```

5. restart server and you can sign in "/api/auth/signin" and signout in "/api/auth/signout"
6. session token will be added in cookies
7. to navigate user programatically do the following in any component
```jsx
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'


function NavBar(){
    
    return (
        <>
            <Link href='/api/auth/signin'>
                <button onClick={()=>{
                    e.preventDefault()
                    signIn('github')
                }}>sign in</button>
            </Link>
            <Link href='/api/auth/signout'>
                <button onClick={()=>{
                    e.preventDefault()
                    signOut()
                }}>sign out</button>
            </Link>
            
        </>
        
    )
}
```

##### checking user is signed in or not
* this can be done using "useSession" hook imported from 'next-auth/client'

````jsx
import { signIn, signOut, useSession } from 'next-auth/client'
function Navbar() {
    const [session, loading] = useSession()
    if (!loading && !session){
        // usser is not logged in
    }
    if (session){
        // usser is logged in
    }
}
````

##### Securing Pages Client-side
1. protected routes, if user is logged in then allow user to access certain page and if not redirect user to login page
2. we use "getSession" function to do this work

````jsx
import {useState,useEffect} from "react";
import {getSession,signIn} from "next-auth/client"
function DashBoard(){
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        const securePage=async ()=>{
            const session=await getSession()
            if (!session){
                // user is not logged in & redirect user to signin

                signIn()
            }else{
                setLoading(false)
            }
        }
        securePage()
    }, []);
    
    
    if (loading){
        return <h2>Loading</h2>
    }
    return <h1>Dashboard protected page</h1>
}
````
3. problem with useSession function is it's in loading state forever and session value is undefined even if user is signed in
4. to fix this problem we need to wrap our components with Provider in _app.js to get session value from 'next-auth'

```jsx
//_app.js
import {Provider} from "next-auth/providers";
function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Navbar />
            <Component {...pageProps} />
        </Provider>
    )
}
```


### Server Side Authentication
1. handling authentication in server side components in get server side props function
2. for getServerSideProps We need to pass context object to getSession function and next js handles rest of all requests
3. Same function can be used in API routes and send unauthorised response if session doesn't exists


```jsx
import {getSession} from "next-auth/client";
function Blog({data}){
    return <h3>{data}</h3>
}
export default Blog;

export async function getServerSideProps(context){
    const session=await getSession(context)
    if (!session){
        
        // if session doesn't exist then redirtect user to login page
        return {
            redirect:{
                destination:'/api/auth/signin?callbackurl=http://localhost:3000/blog',
                permanent:false
            }
        }
    }
    return {
        props:{
            data:session?"personal blogs":"public blogs"
        }
    }
}

```




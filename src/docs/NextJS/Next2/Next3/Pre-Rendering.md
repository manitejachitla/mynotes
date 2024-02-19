---
sidebar_position: 2
---
## getStaticProps

1. this function runs only on service side and never on client side
2. Code inside this function won't be included in JS bundle that is sent to browser
3. we can write server-side code directly in this function
4. server-side code is like node js - (fs module or querying database) and this code won't be sent to browser
5. even API keys are are not sent to browser
6. This function is allowed only in page and cannot be run on components
7. it is used only for pre-rendering and not client-side data fetching
8. this function should return an object and object should have a key "props" which is an object
9. this function will run at build time and during development it runs on every request

````jsx
import User from '../components/user'

function UserList({ users }) {
  return (
    <>
      <h1>List of users</h1>
      {users.map(user => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        )
      })}
    </>
  )
}

export default UserList
````

```jsx
export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  //   console.log(data)

  return {
    props: {
      users: data
    }
  }
}
```


### Link Prefetching
1. Any Link component in the viewport (initially or through scroll) will be prefetched by default (including the corresponding data) for pages using static Generation
2. When a page with getstaticProps is pre-rendered at build time, in adddition to the page HTML file, Nect.js generates a JSON file holding the result of running getStaticProps
3. JSON file will be used in client-side routing through next/link or next/router


## Static Site Generation
1. Static Site Generation is a method of pre-rendering where the HTML pages are generated at build time with and without external data
2. Export getStaticProps function for external data
3. HTML, Javascript and a JSON file are Generated during build time
4. if you navigate directly to page route HTML file is served
5. if you navigate to the page route from a different route, the page is created client side using the javascript and JSON pre-fetched from server


### getStaticPaths
1. This function is mandatory for next js page with variable in route to determine what are possible values for param
2. for all possible values should be mentioned in getstaticpath return object like this
3. next js generated all HTML,JS and HTML+JSON for all mentioned paths
4. to avoid hardcoding postid we can call posts api in params page and generate all possible values with ids from api programatically

```jsx
export function getStaticPaths(){
    return{
        paths:[
            {params:{postId:'1'}},
            {params:{postId:'2'}},
            {params:{postId:'3'}},
        ],
        fallback:false
    }
}
```

## _fallback_
#### fallback : false
1. fallback can have 3 possible values -> true, false and 'blocking'
2. if fallback is set to 'false', next js build all static pages for mentioned paths and shows 404 error for remaining paths

### fallback : true
1. The paths returned from getStaticPaths will be rendered to HTML at build time by
   getStaticProps.

2. The paths that have not been generated at build time will not result in a 404 page. Instead,
   Next.js will serve a “fallback” version of the page on the first request to such a path.

3. In the background, Next.js will statically generate the requested path HTML and JSON. This
   includes running getStaticProps.

4. When that’s done, the browser receives the JSON for the generated path. This will be used to
   automatically render the page with the required props. From the user’s perspective, the page
   will be swapped from the fallback page to the full page.

5. At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent
   requests to the same path will serve the generated page, just like other pages pre-rendered at
   build time.
6. Link pre-fetching will be done even if paths are not mentioned in getStaticPaths  


```jsx
import { useRouter } from 'next/router'

function Post({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  )
}

export default Post
```

````jsx
export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  )
  const data = await response.json()

  if (!data.id) {
    return {
      notFound: true
    }
  }

  console.log(`Generating page for /posts/${params.postId}`)
  return {
    props: {
      post: data
    }
  }
}

export async function getStaticPaths() {
  // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const data = await response.json()
  // const paths = data.map(post => {
  //   return {
  //     params: { postId: `${post.id}` }
  //   }
  // })

  return {
    paths: [
      { params: { postId: '1' } },
      { params: { postId: '2' } },
      { params: { postId: '3' } }
    ],
    fallback: true
  }
}
````
### fallback : 'blocking'
1. similar to fallback: true only difference is user cannot see fallback screen
2. so user will wait until page is rendered on server and sent to browser
3. tab will be loading till it gets data

## Issues with SSG (Static Site Generation)
1. The build time is proportional to the number of pages in the application
2. Issue with Stale data as data is fetched only once when fecthing
3. Solution to these issues is Inceremental Static Regeneration


### Incremental Static Regeneration
There was a need to update only those pages which needed a change without having to rebuild the entire app
1. with ISR, next js allows you to update static pages after you build your application
2. You can statically generate individual pages withour needing to rebuild the entire site, effectively solving the issue of dealing with stale data
### how
In the getStaticProps Function, apart from props key, we can specify a revalidate key
The value of revalidate is number of seconds after which a page re-generation can occur
Re-generation happends only if user makes a request after the re-validate time

````js
export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  )
  const data = await response.json()
  console.log(`Generating page for /products/${params.productId}`)

  return {
    props: {
      product: data
    },
    revalidate: 10
  }
}
````
# Next JS 13 changes

1. Any Component in app folder is a server component by default
2. All Routing is handled in app directory
3. Server Component can be async and we can use it to do all async operations

### Layout.js
1. layout is responsible for rendering all components
2. we can add any common components that should be rendered in each page like Header, footer etc..

```jsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

```


### Routing 
1. each folder in app directory act as a path segment in our application
2. to add a dynamic route we can create a folder with square brackets "[todoId]" and page.jsx inside it
3. we can access todoId in params from props in page.jsx


```jsx
import Link from "next/link";

const fetchTodo=async (todoId)=>{
    let res=await fetch('https://jsonplaceholder.typicode.com/todos/'+todoId)
    const todo=await res.json()
    console.log(todo)
    return todo;
}
async function TodosList(props){
    let {todoId}=props.params
    const todo=await fetchTodo(todoId)
    return (
        <div className={'flex flex-col p-4'}>
            <h2 className={'font-bold text-xl text-emerald-300'}>To Do Details</h2>
            <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
                <p>
                    #{todo.id}: {todo.title}
                    <p>Completed: {todo.completed ? "Yes" : "No"}</p>
                    <p className="border-t Oborder-black mt-5 text-right">
                    By User: {todo.userId}
                    </p>
                </p>
            </div>
        </div>
    )
}

export default TodosList;
```

### Rendering Techniques
1. Server SIde Rendering (SSR),Static Site Generation (SSG), Incremental Site Generation (ISG)
2. these can be defined in fetch method which is upgraded by next js to implement these techniques
```js

// SSR
await fetch('https://jsonplaceholder.typicode.com/todos/'+todoId)

//SSG
await fetch('https://jsonplaceholder.typicode.com/todos/'+todoId,{cache:'force-cache'})


//ISG
await fetch('https://jsonplaceholder.typicode.com/todos/'+todoId,
    {next:{revalidate:60}})

// this will be revalidated in 60 seconds


```

1. to prevent next js static site generation for some pages we can declase dyanmicParams=true in a page and nextjs will not generate static sites for these pages

### NotFound page
1. 'not-found.js' file in any directory act as not found page overwritting next js default not found page
### Loading page
1. 'loading.js' file in any directory act as loading page before the actual sever component is loaded and page will be displayed when we get data from server
### Error page
1. 'error.js' file in any directory act as error page and it is shown to user in case of any unexpected runtime errors

```jsx
//error.js

'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}
```

### Head.js
1. 'head.js' file in any directory controls head section of html like title & description and it will change html content based on route

```jsx
export default function Head({title,description}){
    return (
        <>
            <title>{title}</title>
            {
                description?(
                    <meta name="description" content={description}/>
                ):""
            }
        </>
    )
}
```


### Route Grouping

* suppose you want to organise folders like client routes and admin routes are defined seperately and groupped,you can do this by using route-grouping feature of next ks
* create a folder with **(name)** in app folder and add all routes in that folder
* this type of notation specifies nextjs that this is route grouping and these folders won't be added in routes


### 
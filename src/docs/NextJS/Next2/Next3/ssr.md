---
sidebar_position: 3
---
# Server Side Rendering


problems with static generation
1. We cannot fetch data at request time and we will have stale data as data is fetched at build time
2. We can use ISR with revalidate with low time and still we cannot get updated data as data is updated in background
3. We don't get access to incoming request, like data fetching specific to user
4. So we need a solution that can handle SEO and solving these issues

Why SSR? 
1. Here Page is Generated during request time
2. html is generated for every incoming request and SEO friendly

How?
1. we use 'getServerSideProps' and this is similar to getStaticProps 
1. this function runs only on service side and never on client side
2. Code inside this function won't be included in JS bundle that is sent to browser
3. we can write server-side code directly in this function
4. server-side code is like node js - (fs module or querying database) and this code won't be sent to browser
5. even API keys are are not sent to browser
6. This function is allowed only in page and cannot be run on components
7. it is used only for pre-rendering and not client-side data fetching
8. this function should return an object and object should have a key "props" which is an object
9. this function will run at build time and during development it runs on every request


*context param in getServerSideProps has few properties like request, response, and other routing params, req,res can be used to modify request and get data specific to that user*
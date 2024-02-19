## API Routes

1. API routes can be added in **api** (pages/api) folder in pages
2. API routes can be mapped as same page routes and follow same page and folder structure
3.  Backend Code can be written here (nodejs)
4.  each api file show export default a function and that has to parameters (req,res)
5.  req,res are two standard node js application Request and Response Object
6.  GET,POST,PUT,DELETE requests are supported
7.  All request,parameters and data are present in Request
8.  for Dynamic API routes all parameters are available in req.query (Request Object)


```js
export default function handler(req,res){
    res.status(200).json({name:"Default API Route"})
}
```

#### Catch ALL Routes
1. dynamic segments can be handled by creating a file with spread operator in name surrounded by square brackets like [...params]
2.  And all params are available in req.params
3. 
```js
// http://localhost:3000/api/comments/2/seg/1/seg/3
 export default function handler(req,res){
    let params=req.query
    res.status(200).json(params)
}
```
import{r as o,u as h,a as _,j as t,P as c}from"./index.js";import{M as x}from"./MovieModal.js";const f="_title_op451_1",g="_movieList_op451_17",j="_movieItem_op451_37",M="_moviePoster_op451_67",P="_movieTitle_op451_79",s={title:f,movieList:g,movieItem:j,moviePoster:M,movieTitle:P};function C(){const[n,m]=o.useState([]),[i,l]=o.useState(null),[r,a]=o.useState(!0),v=h();o.useEffect(()=>{_.get("https://api.themoviedb.org/3/trending/movie/day?api_key=686954a6867702e2802dd31dcf4680f7").then(e=>{m(e.data.results),a(!1)}).catch(e=>{console.log(e),a(!1)})},[]);const d=e=>{l(e)},p=()=>{v(`/movies/${i.id}`,{state:{from:"home"}}),l(null)},u=()=>{l(null)};return t.jsxs("div",{children:[t.jsx("h1",{className:s.title,children:"Popular Movies"}),r?t.jsx("p",{children:"Loading..."}):t.jsx("ul",{className:s.movieList,children:n.map(e=>t.jsxs("li",{className:s.movieItem,onClick:()=>d(e),children:[t.jsx("img",{src:`https://image.tmdb.org/t/p/w500/${e.poster_path}`,alt:e.title,className:s.moviePoster}),t.jsx("h2",{className:s.movieTitle,children:e.title})]},e.id))}),i&&t.jsx(x,{movie:i,onClose:u,onMovieDetailsClick:p})]})}C.propTypes={movie:c.object,onClose:c.func};export{C as default};

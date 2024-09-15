import{r as m,u as p,j as o,P as t}from"./index.js";import{M as u}from"./MovieModal.js";const h="_moviesContainer_1xko2_1",x="_noResult_1xko2_9",_="_moviesList_1xko2_15",g="_movieCard_1xko2_24",C="_moviePoster_1xko2_40",a={moviesContainer:h,noResult:x,moviesList:_,movieCard:g,moviePoster:C};function j({searchResults:l}){const[i,r]=m.useState(null),n=p(),c=e=>{console.log("Selected movie:",e),r(e)},v=()=>{console.log("Navigating to movie details:",i),i&&i.id&&(n(`/movies/${i.id}`,{state:{from:"movies"}}),r(null))},d=()=>{r(null)};return o.jsxs("div",{className:a.moviesContainer,children:[l.length>0?o.jsx("ul",{className:a.moviesList,children:l.map(e=>o.jsxs("li",{className:a.movieCard,onClick:()=>c(e),children:[o.jsx("img",{src:e.poster_path?`https://image.tmdb.org/t/p/w500/${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",alt:e.title,className:a.moviePoster}),o.jsx("h3",{children:e.title}),o.jsxs("p",{children:[e.overview?e.overview.length>100?e.overview.substring(0,100)+"...":e.overview:"No overview available"," "]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Release Date:"})," ",e.release_date||"N/A"]})]},e.id))}):o.jsx("p",{className:a.noResult,children:"No results found. Try searching for a movie!"}),i&&o.jsx(u,{movie:i,onClose:d,onMovieDetailsClick:v})]})}j.propTypes={searchResults:t.arrayOf(t.shape({id:t.number.isRequired,title:t.string.isRequired,poster_path:t.string,overview:t.string,release_date:t.string})).isRequired};s;export{j as default};

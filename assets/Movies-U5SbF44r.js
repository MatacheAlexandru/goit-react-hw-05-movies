import{r as v,u as m,j as s,P as i}from"./index-Dz2b_F8H.js";import{M as g}from"./MovieModal-BtSLeQdb.js";const p="_moviesContainer_ggnqx_1",h="_moviesList_ggnqx_9",u="_movieCard_ggnqx_18",x="_moviePoster_ggnqx_34",t={moviesContainer:p,moviesList:h,movieCard:u,moviePoster:x};function _({searchResults:n}){const[o,r]=v.useState(null),a=m(),l=e=>{r(e)},c=()=>{a(`/movies/${o.id}`,{state:{from:"movies"}}),r(null)},d=()=>{r(null)};return s.jsxs("div",{className:t.moviesContainer,children:[n.length>0?s.jsx("ul",{className:t.moviesList,children:n.map(e=>s.jsxs("li",{className:t.movieCard,onClick:()=>l(e),children:[s.jsx("img",{src:`https://image.tmdb.org/t/p/w500/${e.poster_path}`,alt:e.title,className:t.moviePoster}),s.jsx("h3",{children:e.title}),s.jsx("p",{children:e.overview.length>100?e.overview.substring(0,100)+"...":e.overview}),s.jsxs("p",{children:[s.jsx("strong",{children:"Release Date:"})," ",e.release_date]})]},e.id))}):s.jsx("p",{children:"No results found. Try searching for a movie!"}),o&&s.jsx(g,{movie:o,onClose:d,onMovieDetailsClick:c})]})}_.propTypes={searchResults:i.arrayOf(i.shape({id:i.number.isRequired,title:i.string.isRequired,poster_path:i.string,overview:i.string,release_date:i.string})).isRequired};export{_ as default};

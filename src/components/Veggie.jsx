import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
function Veggie() {


    const [Veggie,setVeggie] = useState([]);

    useEffect(() => {
      getVeggie();
    }, []);
  

    const getVeggie = async () => {
      const check = localStorage.getItem("popular");
      if (check) {
        setVeggie(JSON.parse(check));
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`
        );
        const data = await api.json();
  
        localStorage.setItem("veggie", JSON.stringify(data.recipes));
        setVeggie(data.recipes);
        console.log(data.recipe);
      }
    };
    return (
    <div>
      <h1>Our Viggies !!</h1>
      <Wrapper>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "1rem",
          }}
        >
          {Veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/'+recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt="{recipe.title}" />
                  <Gradient />
                  </Link >
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
    );
}
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 18rem;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left:0;
    width:100%;
    height:100%;
    objetc-fit:cover;
  }
  p{
    position:absolute;
    z-index:110;
    left:9rem;
    bottom:0%;
    transform:translate(-50%,0%);
    color: black;
    
    width:100%;
    text-align:center;
    font-weight:bold;
    font-size:14px;
    height:40%;
    display: flex;
    justify-content:center;
    align-items:center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  poaition: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgbs(0, 0, 0, 0.5));
`;
export default Veggie;

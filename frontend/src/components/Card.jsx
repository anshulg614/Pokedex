import React from "react";
import styled from "styled-components";

const Card = ({ pokemon, onClick }) => {
  const { name, sprite, moves, abilities } = pokemon;

  return (
    <CardContainer className="card">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <ImageWrapper>
        <img src={sprite} alt={name} />
      </ImageWrapper>
      <Moves>
        <h4>Moves: {moves}</h4>
      </Moves>
      <Abilities>
        <h4>Abilities: {abilities}</h4>
      </Abilities>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 270px;
  height: 425px;
  padding: 1rem;
  border-radius: 10px;
  background-color: #1f1d1d;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
  color: white;
  font-family: "Arial", sans-serif;
  text-align: left;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex: 1;

  img {
    width: 150px;
    height: 150px;
  }
`;

const Moves = styled.div`
  margin-left: 10px;
`;

const Abilities = styled.div`
  margin-left: 10px;
`;

export default Card;

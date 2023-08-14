import React from "react";
import styled from "styled-components";

const Card = ({ pokemon }) => {
  const { name, sprite, moves, abilities, id } = pokemon;

  return (
    <CardContainer className="card">
      <div className="header">
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <h2>#{id}</h2>
      </div>
      <ImageWrapper>
        <img src={sprite} alt={name} />
      </ImageWrapper>
      <Moves>
        {moves.map((move, index) => (
          <MoveItem key={index}>{move.charAt(0).toUpperCase() + move.slice(1)}</MoveItem>
        ))}
      </Moves>
      <Abilities>
        {abilities.map((ability, index) => (
          <AbilityItem key={index}>{ability.charAt(0).toUpperCase() + ability.slice(1)}</AbilityItem>
        ))}
      </Abilities>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 16.7em;
  height: 30em;
  padding: 1rem;
  border-radius: 10px;
  background-color: #1f1d1d;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
  color: white;
  font-family: "Arial", sans-serif;
  text-align: left;

  .header {
    display: flex;
    justify-content: space-between;
  }
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

const MoveItem = styled.p`
  margin: 5px 0;
`;

const Abilities = styled.div`
  margin-left: 10px;
  font-size: 0.8em;
`;

const AbilityItem = styled.p`
  margin: 5px 0;
`;

export default Card;

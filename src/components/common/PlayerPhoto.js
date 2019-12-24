import React from "react";
import styled from "styled-components";

const PlayerPhoto = ({
  photo,
  name,
  setProfileDialog,
  hasPhoto,
  width,
  height,
  isBank
}) => {
  return (
    <PhotoContainer
      hasPhoto={hasPhoto}
      isBank={isBank}
      className="photo-container"
      width={width}
      height={height}
    >
      <div className="player-photo">
        {photo && <img src={photo} alt={name + " photo"}></img>}
      </div>
    </PhotoContainer>
  );
};

const PhotoContainer = styled.div`
  box-shadow: 10px 10px ${({ hasPhoto }) => (hasPhoto ? "0" : "20px")} -16px rgba(0, 0, 0, 0.75);
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  overflow: hidden;
  border-radius: ${({ hasPhoto }) => (hasPhoto ? 0 : "100%")};

  .player-photo {
    background-color: ${({ hasPhoto, isBank }) =>
      isBank ? "gold" : hasPhoto ? "transparent" : "royalblue"};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: auto;
    }
  }
`;

PlayerPhoto.defaultProps = {
  width: "60px",
  height: "60px"
};

export default PlayerPhoto;

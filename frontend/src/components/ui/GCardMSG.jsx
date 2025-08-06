import React from 'react';
import styled from 'styled-components';

const GCard = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <div className="back bg-slate-800/40">
            <div className="back-content">
                {children}
                          </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 100%;
    height: 380px;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.15), 0 0 25px rgba(0, 255, 255, 0.05);
    border-radius: 5px;
  }

   .back {
    background-color: #141e30;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }

  .back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 220px;
    height: 220%;
    background: linear-gradient(90deg, transparent, #22d3ee, #c084fc, #c084fc, #22d3ee, transparent);
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background-color: #0f172a;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }

    0% {
      transform: rotateZ(360deg);
    }
  }

  `;

export default GCard;

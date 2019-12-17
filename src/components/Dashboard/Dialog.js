import React from 'react'
import styled from 'styled-components'

const DialogWrapper = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.486);
  width: 100%;
  height: 100%;
  z-index: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;

  .dialog-component {
    padding: 0.5rem;
    padding-bottom: 1rem;
    width: 80%;
  }

  .close {
    font-size: 1.5rem;
    display: flex;
    justify-content: flex-end;
    color: royalblue;
    margin-bottom: 10px;
    i:hover{
      cursor: pointer;
      color: rgb(255, 51, 0);
    }
  }
`

const Dialog = ( { open = false , children, closeFunction } ) => {

  return (
    open && (
      <DialogWrapper id="wrapper" onClick={(e) => {
        if (e.target.id === 'wrapper' || e.target.id === 'close' ) closeFunction(e)
      }} className="dialog-wrapper">
        <div className="dialog-component dialog-container">
          <div className="close">
            <i id="close" className="fas fa-times-circle"></i>
          </div>
          {children}
        </div>
      </DialogWrapper>
    )
  )


}

export default Dialog

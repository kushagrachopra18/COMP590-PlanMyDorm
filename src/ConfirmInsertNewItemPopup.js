import React from 'react';

const ConfirmInsertNewItemPopup = ({item, closeFunction, addItemToRoom}) => {
    return (
        <div className='background_overlay' onClick={() => {closeFunction();}}>
            <div className='popup_outer_container' onClick={() => {closeFunction();}}>
                <button className='popup_x'>x</button>
                <div className='popup_inner_container'>
                    <h1>{item.name}</h1>
                    <p className='popup_text'>Dimensions: {parseFloat(item.width/34).toFixed(2)} ft by {parseFloat(item.height/34).toFixed(2)} ft</p>
                </div>
                <button className='pretty_button' onClick={(event) => {
                    event.preventDefault();
                    addItemToRoom();}
                }>Add to room +</button>
            </div>
        </div>
    );
};

export default ConfirmInsertNewItemPopup;
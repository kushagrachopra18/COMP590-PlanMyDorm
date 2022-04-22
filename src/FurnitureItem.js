import React , { useState } from 'react';
import Draggable from 'react-draggable'

const FurnitureItem = ({item, position, setPosition, otherItems, deleteFunc}) => {

    // let rightEdgePos = position.x + item.width;
    // let leftEdgePos = position.x;
    // let topEdgePos = position.y + item.yAdjust;
    // let bottomEdgePos = position.y + item.height + item.yAdjust;

    return (
        <Draggable 
        axis="both"
        cancel="input, textarea, span, label"
        bounds="parent"
        position={position}
        onDrag={
          (e, ui) => {
            // console.log(ui);
          }
        }
        onStop={
          (e, ui) => {
            e.preventDefault();

            let noOverlap = true;

            otherItems.forEach(otherItem => {
                let rightEdgeOverlaping = false;
                let leftEdgeOverlaping = false;
                let topEdgeOverlaping = false;
                let bottomEdgeOverlaping = false;
                console.log(otherItem.name);

                let myLeftEdge = ui.x;
                let otherLeftEdge = otherItem.position.x;
                let myRightEdge = ui.x + item.width;
                let otherRightEdge = otherItem.position.x+otherItem.width;

                let myTopEdge = ui.y + item.yAdjust;
                let otherTopEdge = otherItem.position.y + otherItem.yAdjust;
                let myBottomEdge = ui.y + item.height + item.yAdjust;
                let otherBottomEdge = otherItem.position.y + otherItem.height + otherItem.yAdjust;

                // console.log("myLeftEdge: " + myLeftEdge);
                // console.log("otherLeftEdge: " + otherLeftEdge);
                // console.log("myRightEdge: " + myRightEdge);
                // console.log("otherRightEdge: " + otherRightEdge);

                // console.log("myTopEdge: " + myTopEdge);
                // console.log("otherTopEdge: " + otherTopEdge);
                // console.log("myBottomEdge: " + myBottomEdge);
                // console.log("otherBottomEdge: " + otherRightEdge);
                
                if((myLeftEdge > otherLeftEdge) && (myLeftEdge < otherRightEdge)){
                    leftEdgeOverlaping = true;
                }

                if((myRightEdge < otherRightEdge) && (myRightEdge > otherLeftEdge)){
                    rightEdgeOverlaping = true;
                }
    
                if((myTopEdge > otherTopEdge) && (myTopEdge < otherBottomEdge)){
                    topEdgeOverlaping = true;
                }
    
                if((myBottomEdge < otherBottomEdge) && (myBottomEdge > otherTopEdge)){
                    bottomEdgeOverlaping = true;
                }

                //Handle edge cases where items are directly layed over eachother on 2 or 4 edges
                if((myLeftEdge == otherLeftEdge) && (myRightEdge == otherRightEdge) && (myTopEdge == otherTopEdge) 
                    && (myBottomEdge == otherBottomEdge)){
                        leftEdgeOverlaping=rightEdgeOverlaping=topEdgeOverlaping=bottomEdgeOverlaping=true;
                }
                if(((myLeftEdge == otherLeftEdge) && (myRightEdge == otherRightEdge)) && (topEdgeOverlaping || bottomEdgeOverlaping)){
                    leftEdgeOverlaping=rightEdgeOverlaping=topEdgeOverlaping=bottomEdgeOverlaping=true;
                }
                if(((myTopEdge == otherTopEdge) && (myBottomEdge == otherBottomEdge)) && (leftEdgeOverlaping || rightEdgeOverlaping)){
                    leftEdgeOverlaping=rightEdgeOverlaping=topEdgeOverlaping=bottomEdgeOverlaping=true;
                }
                if((myTopEdge == otherTopEdge) && ((myLeftEdge == otherLeftEdge) || (myRightEdge == otherRightEdge))){
                    leftEdgeOverlaping=rightEdgeOverlaping=topEdgeOverlaping=bottomEdgeOverlaping=true;
                }
                if((myBottomEdge == otherBottomEdge) && ((myLeftEdge == otherLeftEdge) || (myRightEdge == otherRightEdge))){
                    leftEdgeOverlaping=rightEdgeOverlaping=topEdgeOverlaping=bottomEdgeOverlaping=true;
                }

                //Handle corner edge cases
                if(((myTopEdge == otherTopEdge) || (myBottomEdge == otherBottomEdge)) && (rightEdgeOverlaping || leftEdgeOverlaping)){
                    leftEdgeOverlaping=rightEdgeOverlaping=topEdgeOverlaping=bottomEdgeOverlaping=true;
                }
                if(((myLeftEdge == otherLeftEdge) || (myRightEdge == otherRightEdge)) && (topEdgeOverlaping || bottomEdgeOverlaping)){
                    leftEdgeOverlaping=rightEdgeOverlaping=topEdgeOverlaping=bottomEdgeOverlaping=true;
                }

                // console.log("rightEdgeOverlaping: "+ rightEdgeOverlaping);
                // console.log("leftEdgeOverlaping: "+ leftEdgeOverlaping);
                // console.log("topEdgeOverlaping: "+ topEdgeOverlaping);
                // console.log("bottomEdgeOverlaping: "+ bottomEdgeOverlaping);
                // console.log("----------------");

                let numOverlapingEdges = [rightEdgeOverlaping, leftEdgeOverlaping, topEdgeOverlaping, bottomEdgeOverlaping].filter(Boolean).length;

                if(numOverlapingEdges >= 3){
                    // alert("overlaping 3");
                    noOverlap = false;
                }else if(numOverlapingEdges == 2 && !((rightEdgeOverlaping && leftEdgeOverlaping) || (topEdgeOverlaping && bottomEdgeOverlaping))){
                    // alert("overlaping 2");
                    noOverlap = false;
                }else if(numOverlapingEdges == 1 && ((myLeftEdge<otherLeftEdge && myRightEdge>otherRightEdge) || (myTopEdge<otherTopEdge && myBottomEdge>otherBottomEdge))){
                    noOverlap = false;
                }

                console.log(item.fitsThingsUnder);
                console.log(otherItem.fitsThingsUnder);

                if(!noOverlap && (item.fitsThingsUnder == false &&  otherItem.fitsThingsUnder == true)){
                    noOverlap = true;
                }
            });
            if(noOverlap){
                setPosition({ x: ui.x, y: ui.y});
            }
          }
        }
        // defaultPosition={{ x: 100, y: 100}}
      >
        <div className={item.backgroundStyle} 
          style={{ width:item.width+"px", height: item.height+"px"}}
        >
            {deleteFunc && <button className={'popup_x, furniture_x'} onClick={deleteFunc}>x</button>}
            {item.name}
            {item.fitsThingsUnder && <p style={{'font-weight': 'bold', 'font-style': 'italic'}}>*Fits unstriped furniture under*</p>}
            <p>Dimensions: {parseFloat(item.width/34).toFixed(2)} ft by {parseFloat(item.height/34).toFixed(2)} ft</p>
            {/* <p>rightEdgePos {rightEdgePos}</p>
            <p>leftEdgePos {leftEdgePos}</p>
            <p>topEdgePos {topEdgePos}</p>
            <p>bottomEdgePos {bottomEdgePos}</p> */}
        </div>
      </Draggable>
    );
};

export default FurnitureItem;
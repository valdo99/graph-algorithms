import React, {useEffect, useState} from "react";
import useGraph from "./hooks/useGraph";
import styles from "./styles.module.scss";

export default function Grid({
  height: defaultHeight = 50,
  width: defaultWidth = 50,
}) {
  const [height] = useState(defaultHeight);
  const [width] = useState(defaultWidth);
  const [matrix, setMatrix] = useState(
    new Array(height).fill(null).map(()=>new Array(width).fill(1).slice())
  );
  const [clickType,setCLickType] = React.useState()
  const [start,setStart] = React.useState()
  const [finish,setFinish] = React.useState()
  const {solveWithDijkstra} = useGraph(matrix)
  const [resultPath, setResultPath] = useState([])
  const [visitedNodes, setVisitedNodes] = useState([])



  return (
    <div>
      <div className={styles.buttonContainer}>
        <div className={styles.row}>
          <button className={`${styles.button} ${clickType==="START" && styles.disabled}`} disabled={clickType==="START"} onClick={()=>setCLickType("START")}>SET START</button>
          <button className={`${styles.button} ${clickType==="FINISH" && styles.disabled}`} onClick={()=>setCLickType("FINISH")}>SET FINISH</button>
        </div>
        <div className={styles.row}>
          <button className={`${styles.button} ${clickType==="WALL" && styles.disabled}`} onClick={()=>setCLickType("WALL")}>SET WALL</button>
          <button className={styles.button} onClick={()=> {
            if (!start || !finish) {
              alert('please select start node and an end node')
            }else{
              const interval = 500
              const {path, processed} = solveWithDijkstra(`${start[0]}-${start[1]}`,`${finish[0]}-${finish[1]}`)
              const resPath = () => {
                path.slice(1,-1).map((el,index)=>{
                  setTimeout(function () {
                    setResultPath([...path.slice(1,-1).slice(0,index),el])
                  }, index * interval);
                })
              }
              processed.slice(0,-1).map((el,index)=>{
                setTimeout(function () {
                  setVisitedNodes([...processed.slice(0,-1).slice(0,index),el])
    
                  if (index === processed.length-3) {
                    resPath()
                  }
                }, index * (interval / 10));
              })
            }

          }
            }>START</button>
        </div>
      </div>


      <div
        className={styles.gridContainer}
        style={{
          width: width * 29 + "px",
          height: height * 29 + "px",
        }}
      >
        {matrix.map((Ivalue, i) =>
          Ivalue.map((Jvalue, j) => {
            return (
              <div
                key={`${i}-${j}`}
                className={`
                ${styles.cell}
                ${visitedNodes.includes(`${i}-${j}`) ? styles.visitedCell : ''}
                ${start && start[0] === i && start[1] === j ?styles.startCell:''}
                ${finish && finish[0] === i && finish[1] === j ? styles.finishCell:''}
                ${resultPath.includes(`${i}-${j}`) ? styles.resultPath:''}
                ${!isFinite(matrix[i][j]) ? styles.wallCell : ''}
                `}
                onClick={()=>{
                    //TODO handle click if same as start / finish
                    switch (clickType) {
                        case "START":
                            setStart([i,j])
                            break;
                        case "FINISH":
                            setFinish([i,j])
                            break; 
                        case "WALL":
                          const cMatrix = [...matrix]
                          cMatrix[i][j] =  isFinite(cMatrix[i][j]) ? Infinity : 1
                          setMatrix([...cMatrix])
                           
                              break; 
                        default:
                            break;
                    }
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

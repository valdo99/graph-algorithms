import React from 'react'
import { dijkstra } from '../../../algorithms/Dijkstra';

const matrixToAdjList = (matrix) => {
    const graph = {};
    const R = matrix.length
    const C =  matrix[0].length
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        const node = `${r}-${c}`
        if(matrix[r][c] !== 1)
            continue
        
        graph[node] = {}
    
        if (c < C-1) {
            graph[node][`${r}-${c+1}`] = matrix[r][c+1] // move right
        }
        if (r < R-1) {
            graph[node][`${r+1}-${c}`] = matrix[r+1][c] // move down
        }
        if (c > 0) {
            graph[node][`${r}-${c-1}`] = matrix[r][c-1] // move left
        }
        if (r > 0) {
            graph[node][`${r-1}-${c}`] = matrix[r-1][c] // move top
        }
      }
    }
    return graph;
  };


export default function useGraph(matrix=[[]]){
    let adjacencyList = React.useRef({})
    // const [isMounted, setIsMounted] = React.useState(false)


    const createAdjancenyList = (matrix) => {
        adjacencyList.current = matrixToAdjList(matrix)
    }

    const solveWithDijkstra = (startNode, finishNode) =>  {
        createAdjancenyList(matrix)
        return dijkstra(adjacencyList.current,startNode,finishNode)
    }


    return {adjacencyList, createAdjancenyList, solveWithDijkstra}
    
}






useGraph.whyDidYouRender = true
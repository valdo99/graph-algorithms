const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === null || costs[node] < costs[lowest])
        if (!processed.includes(node)) lowest = node;
  
      return lowest;
    }, null);
  };

  const dijkstra = (graph, startNodeName, endNodeName) => {
    console.log(graph,startNodeName,endNodeName);
    let costs = {};
    costs[endNodeName] = Infinity;
    costs = Object.assign(costs, graph[startNodeName]);
  
    // track paths
    const parents = { endNodeName: null };
    for (let child in graph[startNodeName]) {
      parents[child] = startNodeName;
    }
  
    const processed = [];
  
    let node = lowestCostNode(costs, processed);
  
    while (node) {
      let cost = costs[node];
      let children = graph[node];
      for (let n in children) {
        if (String(n) === String(startNodeName)) {}
        else {
          let newCost = cost + children[n];
          if (!costs[n] || costs[n] > newCost) {
            costs[n] = newCost;
            parents[n] = node;
          } 
        }
      }
      processed.push(node);
      node = lowestCostNode(costs, processed);
    }
  
    let optimalPath = [endNodeName];
    let parent = parents[endNodeName];
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse();
  
    const results = {
      distance: costs[endNodeName],
      path: optimalPath,
    };
    return results;
  };

  export {dijkstra}
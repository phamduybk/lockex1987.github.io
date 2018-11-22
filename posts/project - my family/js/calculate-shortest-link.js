function lowestCostNode(costs, processed) {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
}

function getDirectCodes(person) {
  var codes = [];
  if (person.father) {
    codes.push(person.father.code);
  }
  if (person.mother) {
    codes.push(person.mother.code);
  }
  if (person.spouse) {
    codes.push(person.spouse.code);
  }
  if (person.siblings) {
    person.siblings.forEach(sib => {
      if (sib.code != person.code) {
        codes.push(sib.code);
      }
    });
  }
  if (person.directChildren) {
    person.directChildren.forEach(child => {
      if (child.code != person.code) {
        codes.push(child.code);
      }
    });
  }
  return codes;
}

// Function that returns the minimum cost and path to reach Finish
function dijkstra(startCode, finishCode) {
  var startPerson = tree[startCode];
  var finishPerson = tree[finishCode];

  var directCodes = getDirectCodes(startPerson);

  // Track lowest cost to reach each node
  var costs = {};
  //costs[finishCode] = Infinity;
  directCodes.forEach(code => {
    costs[code] = 1;
  });
  //console.log(JSON.stringify(costs));


  // Track paths
  const parents = {};
  parents[finishCode] = null;
  directCodes.forEach(code => {
    parents[code] = startPerson.code;
  });
  //console.log(parents);


  // Track nodes that have already been processed
  const processed = [];


  let nodeCode = lowestCostNode(costs, processed);
  //console.log(nodeCode);
  //console.log(processed);
  //console.log(JSON.stringify(costs));

  while (nodeCode) {
    let cost = costs[nodeCode];
    let nodePerson = tree[nodeCode];
    directCodes = getDirectCodes(nodePerson);
    directCodes.forEach(code => {
      if (code != startCode) {
        let newCost = cost + 1;
        if (!costs[code] || costs[code] > newCost) {
          costs[code] = newCost;
          parents[code] = nodeCode;
        }
      }
    });
    processed.push(nodeCode);
    nodeCode = lowestCostNode(costs, processed);
    //console.log(nodeCode);
    //console.log(processed);
    //console.log(JSON.stringify(costs));
  }

  //console.log(parents);

  let optimalPath = [];
  optimalPath.push(finishCode);
  let parent = parents[finishCode];
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  //optimalPath.reverse();
  //console.log(optimalPath);
  
  
  
  var currentTrackCode = optimalPath[0];
  var currentRelation = RELATIONSHIP;
  for (var i = 1; i < optimalPath.length; i++) {
    var nextTrackCode = optimalPath[i];

    var currentPerson = tree[currentTrackCode];
    var nextPerson = tree[nextTrackCode];
    if (currentPerson.husband && nextPerson.code == currentPerson.husband.code) {
      currentRelation = currentRelation.husband;
    }
    if (currentPerson.wife && nextPerson.code == currentPerson.wife.code) {
      currentRelation = currentRelation.wife;
    }
    if (currentPerson.mother && nextPerson.code == currentPerson.mother.code) {
      currentRelation = currentRelation.mother;
    }
    if (currentPerson.father && nextPerson.code == currentPerson.father.code) {
      currentRelation = currentRelation.father;
    }
    
    if (currentPerson.directChildren) {
      var tempPerson = currentPerson.directChildren.find(child => child.code == nextPerson.code);
      if (tempPerson) {
        if (tempPerson.gender == 'male') {
          currentRelation = currentRelation.son;
        } else {
          currentRelation = currentRelation.daughter;
        }
      }
    }
    if (currentPerson.siblings) {
      var tempPerson = currentPerson.siblings.find(child => child.code == nextPerson.code);
      if (tempPerson) {
        var idx1 = currentPerson.siblings.findIndex(child => child.code == currentPerson.code);
        var idx2 = currentPerson.siblings.findIndex(child => child.code == nextPerson.code);
        //console.log(idx1, idx2);
        if (idx1 > idx2) {
          if (tempPerson.gender == 'male') {
            currentRelation = currentRelation.olderBrother;
          } else {
            currentRelation = currentRelation.olderSister;
          }
        } else {
          if (tempPerson.gender == 'male') {
            currentRelation = currentRelation.youngerBrother;
          } else {
            currentRelation = currentRelation.youngerSister;
          }
        }
      }
    }

    if (!currentRelation) {
      console.log(optimalPath);
      return 'UNK';
    }
    //console.log(nextTrackCode);
    currentTrackCode = nextTrackCode;
  }
  //console.log(currentRelation);
  if (typeof currentRelation == 'string') {
    return currentRelation;
  } else {
    return currentRelation['_'];
  }
}

/*
console.log(dijkstra('HUYEN', 'DUONG'));
console.log(dijkstra('DUONG', 'HUYEN'));
console.log(dijkstra('HOANH', 'DUONG'));
console.log(dijkstra('CHAT', 'DUONG'));

console.log(dijkstra('HUYEN', 'HOANH'));
console.log(dijkstra('HOANH', 'HUYEN'));
console.log(dijkstra('CHAT', 'HUYEN'));

console.log(dijkstra('BANGOAI', 'HUYEN'));
console.log(dijkstra('HUYEN', 'BANGOAI'));

console.log(dijkstra('NAM', 'HUYEN'));
console.log(dijkstra('HUYEN', 'NAM'));
console.log(dijkstra('NAM', 'DUYEN'));

console.log(dijkstra('HUYEN', 'CHI'));
console.log(dijkstra('HUYEN', 'HANAM'));
console.log(dijkstra('HANAM', 'HUYEN'));
*/

function calculateAllRelations() {
  var count = 0;
  for (var p1 in tree) {
    //if (count == 4) {
      for (var p2 in tree) {
        if (p1 != p2) {
          var relation = dijkstra(p1, p2);
          //if (relation == 'UNK') {
            console.log(p1, 'là', relation, p2);
          //}
        }
      }
    //}
    count++;
  }
}

//calculateAllRelations();
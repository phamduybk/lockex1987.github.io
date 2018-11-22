var tree = {};

people.forEach(function(person) {
    tree[person.code] = {
        name: person.fullName,
        class: person.gender,
        marriages: [],
        gender: person.gender,
        code: person.code
    };
});
//console.log(tree);

marriages.forEach(marry => {
    var p1 = tree[marry.couple[0]];
    var p2 = tree[marry.couple[1]];
    var male, female;
    if (p1.gender == 'male') {
        male = p1;
        female = p2;
    } else {
        male = p2;
        female = p1;
    }
    //console.log(p1.gender);
    //console.log(male);

    var children = [];
    marry.children.forEach(childCode => {
        var child = tree[childCode];
        child.father = male;
        child.mother = female;
        children.push(child);
    });
    //console.log(children);

    children.forEach(child => {
        child.siblings = children;
    });

    female.marriages.push({
        spouse: male,
        children: children
    });
    female.directChildren = children;
    female.spouse = male;
    female.husband = male;

    male.marriages.push({
        spouse: female,
        children: children
    });
    male.directChildren = children;
    male.spouse = female;
    male.wife = female;
})

var dTreeData = [tree['ONGNGOAI']];
//var dTreeData = [tree['HOANH']];
//console.log(dTreeData);

//console.log(tree);
var arrFront = [5,7,2,3];

//unshift will put the new objects in front of the array
arrFront.unshift(8);

console.log(arrFront);

var arrPop = [0,5,10,15];

arrPop.shift();

console.log(arrPop);

var arrInsert = [100,200,5];
//2 is the index and 0 is how many elements you want to remove which in this case is Zero
arrInsert.splice(2,0, 311);

console.log(arrInsert);

//Bonus

var arrRemove = [1000,3,204,77];

arrRemove.splice(1,1);

console.log(arrRemove);

var arrSwap = [1,2,3,4];

[arrSwap[0], arrSwap[1]] = [arrSwap[1], arrSwap[0]];
[arrSwap[2], arrSwap[3]] = [arrSwap[3], arrSwap[2]];

console.log(arrSwap);

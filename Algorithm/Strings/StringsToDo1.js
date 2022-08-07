//Remove blanks function
function removeBlanks(str) {
    let myStr = str;
    let noSpace = myStr.replace(/\s/g, '');

    return console.log(noSpace);
}

//Get Digits
function getDigits(num) {

    for(let char in num) {
        if(!isNaN(num[char])){
            console.log(num[char]);
        }
    }
}

//Acronyms
function getAcronyms(str) {
    console.log(str.split( /\b(?=[a-z])/ig ) .map( token => token[0] ).join( '' ).toUpperCase());
}

//Count Non-Space
function countNonSpace(str){
    let counter = 0;
    for (let char in str) {
        if(str[char] != ' ') {
            counter ++;
        }
    }
    return console.log(counter);
}
//Test
removeBlanks(' Pl ayTha tF u nkyM usi c ');
getDigits('abc8c0d1ngd0j0!8');
getAcronyms(" there's no free lunch - gotta pay yer way. ");
countNonSpace('Honey pie, you are driving me crazy');
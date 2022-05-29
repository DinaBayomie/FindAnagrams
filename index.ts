import { getAnagram, readDictionary } from "./app";

console.log('Hello Anagram finder');
console.log('Preparing our dictionary data, this can takes a moment......');
readDictionary().then(data => {
    console.log("all is ready");
    console.log("Please enter a new word:");
    var stdin = process.openStdin();
    stdin.addListener("data", function (d) {
        // note:  d is an object, and when converted to a string it will
        // end with a linefeed.  so we (rather crudely) account for that  
        // with toString() and then trim() 
        let input = d.toString().trim();
        console.log(getAnagram(input));
        console.log("Please enter a new word:");
    });
});
import fs = require('fs');
var dictionary: Map<string, Set<string>> = null;
const regex = /[^\s]\W[^\s]/;
const regex2 = /\W/g;
export const notFoundmsg: string = "There is no anagrams found for the given input in our dictionary";
export const noAnagrammsg:string = "The word exists in our dictionary, but it has no anagrams";
export function getAnagram(input: string) {
    if (dictionary == null) {
        readDictionary();
    }
    if (input.search(regex) != -1) {
        input = input.replace(regex2, '')
    }
    let sorted = input.split('').sort().join('').toLowerCase();
    if (dictionary.has(sorted)) {
        let values:Set<string>= dictionary.get(sorted);
        if(values.size>1){
            return (values);
        }
        else{
            return(noAnagrammsg);
        }
    }
    else {
        return (notFoundmsg);
    }
}

export async function readDictionary() {
    try {
        if (dictionary == null) {
            dictionary = new Map<string, Set<string>>();
            let promise = new Promise(async (resolve, reject) => {
                fs.readFile("./data/SampleWordList.txt", "utf8", (err, data) => {
                    if (err) {
                        console.log("Error reading file from disk:", err);
                    }
                    else {
                        resolve(data.split('\n'))
                    }
                });
            });

            await promise.then((data: string[]) => {
                for (let word of data) {
                    // check if word entry contains "{}\'`" in the middle, if so, then it remove it. Thus, the key wont include any special character.
                    let updatedWord = word
                    if (word.search(regex) != -1) {
                        updatedWord = word.replace(regex2, '')
                    }
                    let key = updatedWord.split('').sort().join('').toLowerCase().replace(/(\r\n|\n|\r)/gm, "");
                    if (dictionary.has(key)) {
                        let values: Set<string> = dictionary.get(key);
                        values.add(word.toString().replace(/(\r\n|\n|\r)/gm, "").toLowerCase());
                        dictionary.set(key, values);
                    }
                    else {
                        let values:Set<string> = new Set<string>();
                        values.add(word.toString().replace(/(\r\n|\n|\r)/gm, "").toLowerCase());
                        dictionary.set(key, values);
                    }
                }
            });

        }

    } catch (error) {
        console.log("An error occurs while reading and creating dictionary MAP object")
        console.log(error);
    }
    return(dictionary)
}

export function getdictionary(){
    if(dictionary==null)
    {
        let promise = new Promise((resolve, reject) => {
            resolve(readDictionary());
        });
        promise.then((data)=>{return (data)})
    }
    return(dictionary)
}

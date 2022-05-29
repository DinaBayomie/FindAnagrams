import { getAnagram, readDictionary, notFoundmsg,getdictionary, noAnagrammsg } from './app'

beforeAll(async () => {
    console.log("before run tests")
    await readDictionary();
  });
it('read wordlist dictionary', async () => {
    
   // expect.hasAssertions();
    let data = getdictionary();
    //await readDictionary().then((data) => { 
        //console.log(data);
        expect(data).toEqual(expect.anything());
        // });
});

it('retrieve the anagrams of "halal" from our dictionary, it should have more than 1 anagram', async () => {
    expect(getAnagram("halal")).toHaveProperty("size",7); 
});
it('retrieve the anagrams of "amateurish" from our dictionary, it should have no anagrams', async () => {
    expect(getAnagram("amateurish")).toEqual(noAnagrammsg); 
});


it('retrieve the anagrams of "hormiguelaxyz" from our dictionary, it should have no anagrams', async () => {
    
    expect.hasAssertions();
    expect(getAnagram("hormiguelaxyz")).toBe(notFoundmsg); 
});


export const getJSONFile = data => {
  return fetch('./data/WineFile.json')
    .then((response) => response.json())
    .then((findresponse)=>{
      console.log(findresponse, ' findresponse');
    })
};
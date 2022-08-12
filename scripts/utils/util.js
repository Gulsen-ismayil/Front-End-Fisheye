export async function getPhotographers() {
    const data = await fetch('data/photographers.json')
    console.log(data);
    const dataPhotographers = await data.json()
    console.log(dataPhotographers);
   
    return dataPhotographers;
}

// DOM
export const url = document.location.href;
export const urlId = new URL(url);
export const params = new URLSearchParams(urlId.search);
export const paramsId = params.get('id')


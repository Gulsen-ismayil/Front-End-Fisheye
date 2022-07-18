export async function getPhotographers() {
    const data = await fetch('data/photographers.json')
    const dataPhotographers = await data.json()
        // .then(data=>data.json())
   
    return dataPhotographers;
}

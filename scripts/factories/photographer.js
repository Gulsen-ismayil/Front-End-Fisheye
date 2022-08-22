// Function Photographers
export function photographerFactory(data) {
    const { name, portrait,city,country,tagline,price,id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a');
        a.setAttribute('href',`photographer.html?id=${id}`);
        const article = document.createElement( 'article' );
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute('alt', name);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const localisationDiv = document.createElement('div');
        localisationDiv.classList.add('localisation');
        localisationDiv.innerHTML = city + ', ' + country ;

        const para = document.createElement('p');
        para.classList.add('paragraph')
        para.innerHTML = tagline;

        const priceJour = document.createElement('p');
        priceJour.classList.add('price');
        priceJour.innerHTML = price+ '€' + '/jour';
     

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisationDiv);
        article.appendChild(para);
        article.appendChild(priceJour);
        a.appendChild(article);

        return (a);
    }
    return { name, picture, getUserCardDOM }
}
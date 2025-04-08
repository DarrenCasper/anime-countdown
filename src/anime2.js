
import { hideAnime1Content, showAnime1Content } from './anime1.js';


const trendingAnime = document.querySelector(`.trending-anime`);
const upcomingAnime = document.querySelector(`.upcoming-anime`);
const currentSeasonAnime = document.querySelector(`.current-season-anime`);
const trendingBtn = document.querySelector(`.trending-Btn`);
const upcomingBtn = document.querySelector(`.upcoming-Btn`);
const currentSeasonBtn = document.querySelector(`.current-season-Btn`);


trendingBtn.addEventListener(`click`, async () => {
    const trendingData = await getAnimeTrending();
    hideAnime1Content();
    showTrending();
    hideCurrent();
    hideUpcoming();
    trendingDisplay(trendingData);
});

upcomingBtn.addEventListener(`click`, async () => {
    const upcomingData = await getAnimeSeasonUpcoming();
    hideAnime1Content();
    showUpcoming();
    hideTrending();
    hideCurrent();
    upcomingDisplay(upcomingData);
});

currentSeasonBtn.addEventListener(`click` ,async () => {
    const currentData = await getAnimeSeasonNow();
    hideAnime1Content();
    showCurrent();
    hideTrending();
    hideUpcoming();
    currentDisplay(currentData);
});


function trendingDisplay(animeList){
    const animeboxContainer = document.querySelector(`.trending-anime-title`);
    const animeContainer = document.querySelector('.trending-anime-info');
    animeContainer.innerHTML = ''; 
    animeboxContainer.innerHTML = ``;

    animeboxContainer.innerHTML = `
        <p class="all-anime-header">Trending Anime</p>
    `;
    
    animeList.forEach(anime => {
        const { title, synopsis, images, episodes, score } = anime;
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card');
        animeDiv.innerHTML = `
            <img src="${images.jpg.image_url}" alt="${title}" class="anime-image">
            <h3 class="anime-title">${title}</h3>
            <p class="anime-synopsis">${synopsis || 'No synopsis available.'}</p>
            <p class="anime-episodes">Episodes: ${episodes || 'N/A'}</p>
            <p class="anime-score">Score: ${score || 'N/A'}</p>
        `;
        animeContainer.appendChild(animeDiv);
    });
}

function upcomingDisplay(animeList){
    const animeboxContainer = document.querySelector(`.upcoming-anime-title`);
    const animeContainer = document.querySelector('.upcoming-anime-info');
    animeContainer.innerHTML = ''; 
    animeboxContainer.innerHTML = ``;

    animeboxContainer.innerHTML = `
        <p class="all-anime-header">Upcoming Anime</p>
    `;
    
    animeList.forEach(anime => {
        const { title, synopsis, images, episodes, score } = anime;
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card');
        animeDiv.innerHTML = `
            <img src="${images.jpg.image_url}" alt="${title}" class="anime-image">
            <h3 class="anime-title">${title}</h3>
            <p class="anime-synopsis">${synopsis || 'No synopsis available.'}</p>
            <p class="anime-episodes">Episodes: ${episodes || 'N/A'}</p>
            <p class="anime-score">Score: ${score || 'N/A'}</p>
        `;
        animeContainer.appendChild(animeDiv);
    });

}

function currentDisplay(animeList){
    const animeboxContainer = document.querySelector(`.current-season-anime-title`);
    const animeContainer = document.querySelector('.current-season-anime-info');
    animeContainer.innerHTML = ''; 
    animeboxContainer.innerHTML = ``;

    animeboxContainer.innerHTML = `
        <p class="all-anime-header">Current Season Anime</p>
    `;
    
    animeList.forEach(anime => {
        const { title, synopsis, images, episodes, score } = anime;
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card');
        animeDiv.innerHTML = `
            <img src="${images.jpg.image_url}" alt="${title}" class="anime-image">
            <h3 class="anime-title">${title}</h3>
            <p class="anime-synopsis">${synopsis || 'No synopsis available.'}</p>
            <p class="anime-episodes">Episodes: ${episodes || 'N/A'}</p>
            <p class="anime-score">Score: ${score || 'N/A'}</p>
        `;
        animeContainer.appendChild(animeDiv);
    });
}

async function getAnimeSeasonNow(){
    try{
        const response = await fetch(`https://api.jikan.moe/v4/seasons/now`);
        const animeData = await response.json();
        return animeData.data;
    }
    catch(error){
        console.error(error);
    }
}

async function getAnimeSeasonUpcoming(){
    try{
        const response = await fetch(`https://api.jikan.moe/v4/seasons/upcoming`);
        const animeData = await response.json();
        return animeData.data;
    }
    catch(error){
        console.error(error);
    }
}

async function getAnimeTrending(){
    try{
        const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=airing&limit=20`);
        const animeData = await response.json();
        return animeData.data;
    }
    catch(error){
        console.error(error);
    }
}

export function hideTrending() {
    const trendingAnime = document.querySelector(`.trending-anime`);
    trendingAnime.classList.add('hidden'); 
}

export function showTrending() {
    const trendingAnime = document.querySelector(`.trending-anime`);
    trendingAnime.classList.remove('hidden'); 
}
export function hideUpcoming() {
    const upcomingAnime = document.querySelector(`.upcoming-anime`);
    upcomingAnime.classList.add('hidden'); 
}

export function showUpcoming() {
    const upcomingAnime = document.querySelector(`.upcoming-anime`);
    upcomingAnime.classList.remove('hidden'); 
}
export function hideCurrent() {
    const currentSeasonAnime = document.querySelector(`.current-season-anime`);
    currentSeasonAnime.classList.add('hidden'); 
}

export function showCurrent() {
    const currentSeasonAnime = document.querySelector(`.current-season-anime`);
    currentSeasonAnime.classList.remove('hidden'); 
}
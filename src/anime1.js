

const animeCategories = document.querySelector(`.anime-categories`);
const animeCountDown = document.querySelector(`.anime-countdown`);
const trending = document.querySelector(`.trending`);
const upcoming = document.querySelector(`.upcoming`);
const airingsoon = document.querySelector(`.airing-soon`);
const currentSeason = document.querySelector(`.current-season`);
const currentDate = new Date();


document.addEventListener(`DOMContentLoaded`, async event =>{
    try{
        const animeSeasonDataCurrent = await getAnimeSeasonNow();
        const animeSeasonDataUpcoming = await getAnimeSeasonUpcoming();
        const animeTrendingData = await getAnimeTrending();
        console.log(animeSeasonDataCurrent);
        displayAnimeCountdownText(animeSeasonDataCurrent);
        displayAnimeSeasonNow(animeSeasonDataCurrent);
        displayAnimeSeasonUpcoming(animeSeasonDataUpcoming);
        displayAnimeTrending(animeTrendingData);
    }
    catch(error){
        console.error(error);
    }
});

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


function getSeason(){
    const month = currentDate.getMonth() + 1;
    const season = month >= 3 && month <= 5 ? 'Spring' :
                  month >= 6 && month <= 8 ? 'Summer' :
                  month >= 9 && month <= 11 ? 'Fall' : 'Winter';
    return season;
}

function displayAnimeCountdownText(animeList){
    const animeDivTitle = document.createElement(`div`);
    const season = getSeason();
    const animeYear = animeList[0].year;
    animeDivTitle.classList.add(`anime-title`);
    animeDivTitle.innerHTML = `
        <p class="anime-header">Anime Countdown, Schedules, and Release Dates.</p>
        <p class="anime-footer">Anime timers and charts for ${season} ${animeYear} and beyond</p>
    `;
    animeCountDown.appendChild(animeDivTitle);
}

function displayAnimeSeasonNow(animeList){
    const animeDivTitle = document.createElement(`div`);
    animeDivTitle.classList.add(`anime-title1`);
    animeDivTitle.innerHTML = `
        <p class="anime-header">Current Season Anime</p>
    `;
    currentSeason.appendChild(animeDivTitle);

    animeList.forEach(anime => {
        const { title, title_japanese, images, broadcast} = anime;
        const { day, time, string, timezone} = broadcast || {};
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card1');
        animeDiv.innerHTML = `
            <div class="anime-leftside">
            <img src="${images.jpg.image_url}" alt="${title}" class="anime-image">
            </div>
            <div class="anime-rightside">
            <h3 class="anime-title2">${title}</h3>
            <p class="anime-title-japanese">${title_japanese || 'No Japanese title available.'}</p>
            <p class="anime-broadcast">${string || 'No broadcast information available.'}</p>
            <p class="anime-broadcast-details">
                Day: ${day || 'N/A'}, Time: ${time || 'N/A'}, Timezone: ${timezone || 'N/A'}
            </p>
            </div>
        `;
        currentSeason.appendChild(animeDiv);
    });
}

function displayAnimeSeasonUpcoming(animeList){
    const animeDivTitle = document.createElement(`div`);
    animeDivTitle.classList.add(`anime-title1`);
    animeDivTitle.innerHTML = `
        <p class="anime-header">Upcoming Season Anime</p>
    `;
    upcoming.appendChild(animeDivTitle);

    animeList.forEach(anime => {
        const { title, title_japanese, images, broadcast} = anime;
        const { day, time, string, timezone} = broadcast || {};
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card1');
        animeDiv.innerHTML = `
            <div class="anime-leftside">
            <img src="${images.jpg.image_url}" alt="${title}" class="anime-image">
            </div>
            <div class="anime-rightside">
            <h3 class="anime-title2">${title}</h3>
            <p class="anime-title-japanese">${title_japanese || 'No Japanese title available.'}</p>
            <p class="anime-broadcast">${string || 'No broadcast information available.'}</p>
            <p class="anime-broadcast-details">
                Day: ${day || 'N/A'}, Time: ${time || 'N/A'}, Timezone: ${timezone || 'N/A'}
            </p>
            </div>
        `;
        upcoming.appendChild(animeDiv);
    });
}

function displayAnimeTrending(animeList){
    const animeDivTitle = document.createElement(`div`);
    animeDivTitle.classList.add(`anime-title1`);
    animeDivTitle.innerHTML = `
        <p class="anime-header">Trending Anime</p>
    `;
    trending.appendChild(animeDivTitle);

    animeList.forEach(anime => {
        const { title, title_japanese, images, broadcast} = anime;
        const { day, time, string, timezone} = broadcast || {};
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card1');
        animeDiv.innerHTML = `
            <div class="anime-leftside">
            <img src="${images.jpg.image_url}" alt="${title}" class="anime-image">
            </div>
            <div class="anime-rightside">
            <h3 class="anime-title2">${title}</h3>
            <p class="anime-title-japanese">${title_japanese || 'No Japanese title available.'}</p>
            <p class="anime-broadcast">${string || 'No broadcast information available.'}</p>
            <p class="anime-broadcast-details">
                Day: ${day || 'N/A'}, Time: ${time || 'N/A'}, Timezone: ${timezone || 'N/A'}
            </p>
            </div>
        `;
        trending.appendChild(animeDiv);
    });
}


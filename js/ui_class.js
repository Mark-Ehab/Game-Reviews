/*-----------------------------------
# External Script File for UI Class #
------------------------------------*/

/*-------------------------------------------------
# Apply strict mode on the script
--------------------------------------------------*/
"use strict";

export class Ui {
  displaySection(section) {
    section.classList.remove("d-none");
  }
  hideSection(section) {
    section.classList.add("d-none");
  }
  displayGames(games) {
    let gamesGallery = document.querySelector(
      "#games-gallery .container > .row"
    );
    let blackBox = "";
    for (const {
      id,
      thumbnail,
      title,
      short_description,
      genre,
      platform,
    } of games) {
      blackBox += `            
<div class="col-12 col-md-6 col-lg-4 col-xl-3">
    <div class="card bg-transparent text-center h-100" cardId="${id}">
        <div class="card-upper p-3 h-100">
            <figure class="m-0">
            <img
                src="${thumbnail}"
                alt="${title}"
                class="w-100 object-fit-cover h-100"
            />
            </figure>
            <div class="card-body p-0 pt-3">
            <div class="card-title row m-0 gx-0 mb-2">
            <div class="col-9"><div class="inner d-flex align-items-center h-100"><h2 class="text-start m-0">${title}</h2></div></div>
            <div class="col-3"><div class="inner">   
                <span
                class="badge bg-primary d-flex justify-content-center align-items-center p-2 ms-auto"
                >Free</span
                ></div>
                </div>
            </div>
            <p class="card-text opacity-50">
                ${short_description.split(" ", 10).join(" ")}
            </p>
            </div>
        </div>
        <div
            class="card-footer px-3 py-2 d-flex justify-content-between"
        >
            <span
            class="badge d-flex justify-content-center align-items-center p-2 text-uppercase"
            >${genre}</span
            >
            <span
            class="badge d-flex justify-content-center align-items-center p-2"
            >${platform}</span
            >
        </div>
    </div>
</div>`;
    }
    gamesGallery.innerHTML = blackBox;
  }
  displayGameDetails(gameDetails) {
    const { title, platform, status, description, genre, thumbnail, game_url } =
      gameDetails;
    let gameDetailsContent = document.querySelector(
      "#game-details-page .game-details-content"
    );
    gameDetailsContent.innerHTML = `        
          <div class="col-12 col-md-4">
            <figure class="m-0">
              <img src="${thumbnail}" alt="" class="w-100" />
            </figure>
          </div>
          <div class="col-12 col-md-8">
            <article>
              <h2 class="text-capitalize">title: ${title}</h2>
              <ul class="game-details-meta-data list-unstyled m-0">
                <li>
                  Category:
                  <span class="badge text-black"> ${genre}</span>
                </li>
                <li>
                  Platform:
                  <span class="badge text-black"> ${platform}</span>
                </li>
                <li>
                  Status:
                  <span class="badge text-black"> ${status}</span>
                </li>
              </ul>
              <p>
             ${description}
              </p>
              <a target="blank" href="${game_url}" class="btn show-game-btn text-capitalize"
                >show game</a
              >
            </article>
          </div>`;
  }
}

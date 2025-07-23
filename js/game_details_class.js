/*---------------------------------------------
# External Script File for Game Details Class #
----------------------------------------------*/

/*-------------------------------------------------
# Apply strict mode on the script
--------------------------------------------------*/
"use strict";

/*-------------------------------------------------
# Imported Modules or Libraries
--------------------------------------------------*/
import { Ui } from "./ui_class.js";
import { Games } from "./games_class.js";

export class GameDetails {
  constructor(gameId) {
    this.gamesPage = document.getElementById("games-page");
    this.gameDetailsPage = document.getElementById("game-details-page");
    this.loader = document.getElementById("lightbox-loader");
    this.closeBtn = document.querySelector(".btn-close");
    this.closeBtn.addEventListener("click", () => {
      this.ui.hideSection(this.gameDetailsPage);
      this.ui.displaySection(this.gamesPage);
    });
    this.getGameDetails(gameId);
    this.ui = new Ui();
  }
  async getGameDetails(game_Id) {
    const freeToGameApiBaseURL =
      "https://free-to-play-games-database.p.rapidapi.com/api";
    const requestInit = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "cbf4b77fecmsh522836370429955p176e3bjsn0e5fbe4d943b",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
      },
    };
    try {
      const response = await fetch(
        `${freeToGameApiBaseURL}/game?id=${game_Id}`,
        requestInit
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.status_message || data?.message || "Undefined Error Occured."
        );
      }
      this.ui.hideSection(this.loader);
      this.ui.displayGameDetails(data);
    } catch (e) {
      console.log(e);
    }
  }
}

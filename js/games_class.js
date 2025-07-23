/*---------------------------------------------
# External Script File for Games Review Class #
----------------------------------------------*/

/*-------------------------------------------------
# Apply strict mode on the script
--------------------------------------------------*/
"use strict";

/*-------------------------------------------------
# Imported Modules or Libraries
--------------------------------------------------*/
import { Ui } from "./ui_class.js";
import { GameDetails } from "./game_details_class.js";

export class Games {
  constructor() {
    this.gamesPage = document.getElementById("games-page");
    this.gameDetailsPage = document.getElementById("game-details-page");
    this.loader = document.getElementById("lightbox-loader");
    this.activeNavLink = document.querySelector(
      "#navbar .navbar-nav .nav-item .nav-link.active"
    );
    this.navLinks = document.querySelectorAll(
      "#navbar .navbar-nav .nav-item .nav-link"
    );
    Array.from(this.navLinks).forEach((navLink) => {
      navLink.addEventListener("click", (evt) => {
        if (!evt.target.classList.contains("active")) {
          evt.target.classList.toggle("active");
          this.activeNavLink.classList.toggle("active");
          this.activeNavLink = evt.target;
          this.getGames(evt.target.innerHTML);
        }
      });
    });
    document.addEventListener("DOMContentLoaded", () => {
      this.getGames("mmorpg");
    });
    this.ui = new Ui();
  }
  async getGames(gameCategory) {
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
      this.ui.displaySection(this.loader);
      const response = await fetch(
        `${freeToGameApiBaseURL}/games?category=${gameCategory}`,
        requestInit
      );
      const data = await response.json();
      this.ui.hideSection(this.loader);
      if (!response.ok) {
        throw new Error(
          data?.status_message || data?.message || "Undefined Error Occured."
        );
      }
      this.ui.displayGames(data);
      Array.from(document.querySelectorAll(".card")).forEach((card) => {
        card.addEventListener("click", (evt) => {
          this.ui.hideSection(this.gamesPage);
          this.ui.displaySection(this.loader);
          this.ui.displaySection(this.gameDetailsPage);
          const gameDetails = new GameDetails(
            evt.currentTarget.getAttribute("cardId")
          );
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}

"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show story submit form on click on "submit" */

function navSubmitClick(evt){
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $storyForm.show();
  putStoriesOnPage();
}

$navSubmit.on("click", navSubmitClick);

/** Show favorites on click on "favorites" */
function navFavoritesClick(evt){
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesOnPage();
}

$navFavorites.on("click", navFavoritesClick);


/** Show user stories on click on "my stories" */
function navMyStoriesClick(evt){
  console.debug("navMyStoriesClick", evt);
  hidePageComponents();
  putUserStoriesOnPage();
}

$navMyStories.on("click", navMyStoriesClick);


/** Show user profile info on click on (username) */
function navUserProfileClick(evt){
  console.debug("navUserProfileClick", evt);
  hidePageComponents();
  putUserProfileOnPage();
}

$navUserProfile.on("click", navUserProfileClick);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $accountContainer.show();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  putStoriesOnPage();
  $loginForm.hide();
  $signupForm.hide();
  $navLogin.hide();
  $navBarCenter.show();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");
const $storiesContainer = $(".stories-container");
const $accountContainer = $(".account-container");

//selector for all lists with class "stories-list"
const $storyLists = $(".stories-list");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

//navbar submit/favorites/my stories
const $navBarCenter = $(".navbar-center");

//submit
const $navSubmit = $("#nav-submit");
const $storyForm = $("#story-form");

//favorites
const $navFavorites = $("#nav-favorites");
const $favoriteStoriesList = $("#favorite-stories-list")

//my stories
const $navMyStories = $("#nav-my-stories");
const $myStoriesList = $("#my-stories-list");

//login/signup/userProfile
const $userProfile = $("#user-profile")
const $navUserProfile = $("#nav-user-profile");
const $navLogin = $("#nav-login");
const $navLogOut = $("#nav-logout");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");


/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $storiesContainer,
    $accountContainer,
    $allStoriesList,
    $favoriteStoriesList,
    $myStoriesList,
    $storyForm,
    $userProfile,
    $loginForm,
    $signupForm,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);

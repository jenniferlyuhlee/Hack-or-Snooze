"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  
  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 * - showTrash: boolean for showing trash icon
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showTrash = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      ${showTrash ? addTrash() : ""}
      ${showStar ? addStar(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <div class="story-author">by ${story.author}</div>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Makes favorited/not-favorited Star */
function addStar(story, user) {
  const starType = user.isFavorite(story)? "fas" : "far";
  return `
    <span class="star">
    <i class="${starType} fa-star"></i>
    </span>`;
}

function addTrash(){
  return `
    <span class="trash">
    <i class="fas fa-trash-alt"></i>
    </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $storiesContainer.show();
  $accountContainer.hide();
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/** When story form is submitted, adds data to API so that it can create story element and put it on the page*/
async function submitStory(evt){
  evt.preventDefault();
  console.debug("submitStory", evt)

  let author = $("#story-author").val();
  let title = $("#story-title").val();
  let url = $("#story-url").val();
  await storyList.addStory(currentUser, {title, author, url});

  putStoriesOnPage();
  $storyForm.slideUp(500);
  $("#story-author").val("");
  $("#story-title").val("");
  $("#story-url").val("");
}

$storyForm.on("submit", submitStory);


/** Deleting stories*/
async function clickDeleteStory(evt){
  console.debug("clickDeleteStory");
  const $target = $(evt.target);
  const storyId = $target.parent().parent().attr('id');

  await storyList.deleteStory(currentUser, storyId);
  putUserStoriesOnPage();

}
$myStoriesList.on("click", ".trash", clickDeleteStory);


/***********************************************************************/

/** Gets list of favorites stories from server, generates HTML and puts on page */
function putFavoritesOnPage(){
  $storiesContainer.show();
  $favoriteStoriesList.empty();
  if (currentUser.favorites.length === 0){
    $('<h5>Start favoriting stories!</h5>').appendTo($favoriteStoriesList);
  }
  else{
    for (let story of currentUser.favorites){
      const $story = generateStoryMarkup(story);
      $favoriteStoriesList.append($story);
    }
  }
  $favoriteStoriesList.show();
}


/** Click event for adding/removing favorites*/
async function toggleFavoriteStory(evt){
  console.debug("toggleFavoriteStory");
  const $target = $(evt.target);
  const storyId = $target.parent().parent().attr('id');
  const story = storyList.stories.find(s => s.storyId === storyId);
console.debug($target);
  //if not favorited, checks star & updates API 
  if ($target.hasClass('far')){
    $target.removeClass('far');
    $target.addClass('fas');
    await currentUser.addFavoriteStory(story);
  }
  //if already favorited, unchecks star & updates API
  else{
    $target.removeClass('fas');
    $target.addClass('far');
    await currentUser.removeFavoriteStory(story);
  }
}
$storyLists.on("click", ".star", toggleFavoriteStory);


/***********************************************************************/

/** Gets list of user stories from server, generates HTML and puts on page */
function putUserStoriesOnPage(){
  $storiesContainer.show();
  $myStoriesList.empty();
  if (currentUser.ownStories.length === 0){
    $('<h5>Start submitting stories!</h5>').appendTo($myStoriesList);
  }
  else{
    for (let story of currentUser.ownStories){
      const $story = generateStoryMarkup(story, true);
      $myStoriesList.append($story);
    }
  }
  $myStoriesList.show();
}






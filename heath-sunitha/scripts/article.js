'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// PUT YOUR RESPONSE HERE

//this function is used to make new objects as this is a Constructor function. it is capitalized to tell us that it is one. "this" refers to the key properties of the Constructor it self. the "rawDataObj" is the objects that will be outputted from the rawData array.

function Article (rawDataObj) {
  // done: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // PUT YOUR RESPONSE HERE
  //

  let $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');
  /* Done: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);
  $newArticle.find('a').text(this.author);
  $newArticle.find('href').text(this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.article-body').append(this.body);
  $newArticle.find('time').attr('datetime', this.publishedOn);


  /* TODO- done: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

//TODO: Refactor these for loops using the .forEach() array method.
for(let i = 0; i < rawData.length; i++) {
  articles.push(new Article(rawData[i]));
}
 
for(let i = 0; i < articles.length; i++) {
  $('#articles').append(articles[i].toHtml());
}


// function pushArticle(newrawData) {
//   articles.push(new Article(newrawData));
// }

// rawData.forEach(pushArticle);



// function appendArticle() {
//   $('#articles').append(articles.toHtml());
// }

// articles.forEach(appendArticle);

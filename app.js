let allTheArticles = [];

window.onload = function() {
  request_NewsArticles();
  this.retrieveDate();
};

function retrieveDate() {
  var newDate = new Date();
  let dateContainer = document.querySelector("#date-header");
  let dateStr = document.createTextNode(newDate.toDateString());
  dateContainer.appendChild(dateStr);
}

function request_NewsArticles() {
  var elem = document.getElementById("sub-category");
  var category = elem.options[elem.selectedIndex].value;
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "http://newsapi.org/v2/top-headlines?country=us&category=" +
      category +
      "&apiKey=2de8bebd4cc24d51bc4bf38508bbcd7d",
    false
  );
  request.onload = function() {
    if (request.status == 200) {
      data = JSON.parse(this.response);
      let newsContainer = document.querySelector(".newspaper-container");
      newsContainer.innerHTML = "";
      let translatedArticles = [];
      data.articles.forEach(article => {
        //before you call this funcion take article.title and article.description and do something like "article.title" +"$"+"article.description"
        // then translate that whole string in the function
        let TranslateFullString = article.title + "~" + article.description;
        convertText(TranslateFullString);
        function convertText(text) {
          const request = new XMLHttpRequest();
          let encodedText = encodeURIComponent(text.trim());
          request.open(
            "GET",
            "https://api.funtranslations.com/translate/shakespeare.json?text=" +
              encodedText,
            true
          );
          request.setRequestHeader(
            "X-FunTranslations-Api-Secret",
            "EDLRqx0AemHwmKnrj_WxmweF"
          );

          request.onload = function() {
            if (request.status == 200) {
              translatedDescription = JSON.parse(this.response);
              //here you would do let splitArr = translatedDescription.contents.translated.split('$')
              //this should give you an array with 2 index, splitArr[0] should be title and splitArr[1] should be description
              // then do article.title = splitArr[0].join('') and article.description = splitArr[1].join('')

              let splitArr = translatedDescription.contents.translated.split(
                "~"
              );
              article.title = splitArr[0];
              article.description = splitArr[1];
              makeTheArticleRow(article);
            }
          };
          request.send();
        }
      });
    }
  };
  request.send(null);
}

makeTheArticleRow = theArticle => {
  let newsContainer = document.querySelector(".newspaper-container");
  let newsContentChildren = [];
  let articleContent = [];
  let articleContainer = makeAnElement("div", "class", "article-container");
  let articleImg = makeAnElement("div", "class", "img-container");
  articleImg.style["background-image"] = `url("${theArticle.urlToImage}")`;
  let newsContent = makeAnElement("div", "class", "news-content");
  let newsAuthor = makeAnElement("h4", "class", "news-author");
  let newsTitle = makeAnElement("p", "class", "news-title");
  let newsDescription = makeAnElement("p", "class", "news-description");
  let newsURL = makeAnElement("a", "href", theArticle.url);
  newsURL.innerHTML = theArticle.url;
  let newsAuthorText;
  if (theArticle.author === null) {
    newsAuthorText = document.createTextNode("No Author");
  } else {
    newsAuthorText = document.createTextNode(theArticle.author);
  }
  let newsTitleText = document.createTextNode(theArticle.title);
  let newsDescriptionText = document.createTextNode(theArticle.description);
  newsTitle.appendChild(newsTitleText);
  newsAuthor.appendChild(newsAuthorText);
  newsDescription.appendChild(newsDescriptionText);
  newsContentChildren.push(newsAuthor, newsTitle, newsDescription, newsURL);
  articleContent.push(articleImg, newsContent);
  appendMultipleChild(newsContentChildren, newsContent);
  appendMultipleChild(articleContent, articleContainer);
  newsContainer.appendChild(articleContainer);
};

appendMultipleChild = (children, parent) => {
  children.forEach(child => {
    parent.appendChild(child);
  });
};

makeAnElement = (elementType, attribute, name) => {
  let newElement = document.createElement(elementType);
  newElement.setAttribute(attribute, name);
  return newElement;
};

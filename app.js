window.onload = function() {
  request_NewsArticles();
};

function request_NewsArticles() {
  var elem = document.getElementById("sub-category");
  var category = elem.options[elem.selectedIndex].value;
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "http://newsapi.org/v2/top-headlines?country=us&category=" +
      category +
      "&apiKey=2de8bebd4cc24d51bc4bf38508bbcd7d",
    true
  );
  request.onload = function() {
    if (request.status == 200) {
      data = JSON.parse(this.response);
      let newsContainer = document.querySelector(".newspaper-container");
      newsContainer.innerHTML = "";
      makeTheArticleRow(data.articles);
    }
  };
  request.send(null);
}

function convertText(text) {
  const request = new XMLHttpRequest();
  let encodedText = encodeURIComponent(text.trim());
  request.open(
    "GET",
    "https://api.funtranslations.com/translate/shakespeare.json?text=" +
      encodedText,
    true
  );
  request.setRequestHeader('X-FunTranslations-Api-Secret' ,'EDLRqx0AemHwmKnrj_WxmweF');

  request.onload = function() {
    if (request.status == 200) {
      data = JSON.parse(this.response);
      return data["contents"]["translated"];
    }
  };
  request.send();

};

makeTheArticleRow = allArticles => {
  let newsContainer = document.querySelector(".newspaper-container");
  console.log(allArticles);
  for (i = 0; i < 1; i++) {
    let newsContentChildren = [];
    let articleContent = [];
    let articleContainer = makeAnElement("div", "class", "article-container");
    let articleImg = makeAnElement("div", "class", "img-container");
    articleImg.style["background-image"] = `url("${allArticles[i].urlToImage}")`;
    let newsContent = makeAnElement("div", "class", "news-content");
    let newsAuthor = makeAnElement("h4", "class", "news-author");
    let newsTitle = makeAnElement("p", "class", "news-title");
    let newsDescription = makeAnElement("p", "class", "news-description");
    let newsURL = makeAnElement("a", "href", allArticles[i].url);
    newsURL.innerHTML = allArticles[i].url;
    let newsAuthorText;
    if (allArticles[i].author == 'null') {
     newsAuthor.innerHTML = 'No Author';
    } else {
     newsAuthorText = document.createTextNode(allArticles[i].author);
    }
    let newsTitleText = document.createTextNode(allArticles[i].title);

    //CHECK HERE MITCH, Trying to convert before displaying it but getting undefined
    console.log(convertText(allArticles[i].description));
    let newsDescriptionText = document.createTextNode(allArticles[i].description);
    newsTitle.appendChild(newsTitleText);
    newsAuthor.appendChild(newsAuthorText);
    
    newsDescription.appendChild(newsDescriptionText);
    newsContentChildren.push(newsAuthor, newsTitle, newsDescription, newsURL);
    articleContent.push(articleImg, newsContent);
    appendMultipleChild(newsContentChildren, newsContent);
    appendMultipleChild(articleContent, articleContainer);
    newsContainer.appendChild(articleContainer);
  }
  // allArticles.forEach(singleArticle => {
  //   let newsContentChildren = [];
  //   let articleContent = [];
  //   let articleContainer = makeAnElement("div", "class", "article-container");
  //   let articleImg = makeAnElement("div", "class", "img-container");
  //   articleImg.style["background-image"] = `url("${singleArticle.urlToImage}")`;
  //   let newsContent = makeAnElement("div", "class", "news-content");
  //   let newsAuthor = makeAnElement("h4", "class", "news-author");
  //   let newsTitle = makeAnElement("p", "class", "news-title");
  //   let newsDescription = makeAnElement("p", "class", "news-description");
  //   let newsURL = makeAnElement("a", "href", singleArticle.url);
  //   newsURL.innerHTML = singleArticle.url;
  //   let newsAuthorText;
  //   if (singleArticle.author == 'null') {
  //    newsAuthor.innerHTML = 'No Author';
  //   } else {
  //    newsAuthorText = document.createTextNode(singleArticle.author);
  //   }
  //   let newsTitleText = document.createTextNode(convertText(singleArticle.title));
  //   let newsDescriptionText = document.createTextNode(
  //     singleArticle.description
  //   );
  //   newsTitle.appendChild(newsTitleText);
  //   newsAuthor.appendChild(newsAuthorText);
  //   newsDescription.appendChild(newsDescriptionText);
  //   newsContentChildren.push(newsAuthor, newsTitle, newsDescription, newsURL);
  //   articleContent.push(articleImg, newsContent);
  //   appendMultipleChild(newsContentChildren, newsContent);
  //   appendMultipleChild(articleContent, articleContainer);
  //   newsContainer.appendChild(articleContainer);
  // });
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

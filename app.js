
window.onload = function() {
    let articles = this.request_NewsArticles();
    this.console.log(articles);
}

function request_NewsArticles() {

    let articles = [];
    const request = new XMLHttpRequest();

    request.open("GET", "http://newsapi.org/v2/top-headlines?country=us&apiKey=2de8bebd4cc24d51bc4bf38508bbcd7d", true);

    request.onload = function() {
        if (request.status == 200) {
            data = JSON.parse(this.response);
            data["articles"].forEach(article => {
                    articles.push(new Article(article.source["name"], article.author, article.title,
                        article.description, article.url, article.urlToImage, article.publishedAt));
            });
        }
    }
    request.send();
    return articles;

}

class Article {
    constructor(source, author, title, 
        description, url, urlImg, published) {
            this.source = source;
            this.author = author;
            this.title = title;
            this.description = description;
            this.url = url;
            this.urlImage = urlImg;
            this.published = published;
    }
}
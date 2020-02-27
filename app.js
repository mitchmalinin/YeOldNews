
window.onload = function() {
    this.request_NewsData();
}

function request_NewsData() {

    const request = new XMLHttpRequest();
    request.open("GET", "http://newsapi.org/v2/everything?q=bitcoin&from=2020-01-27&sortBy=publishedAt&apiKey=2de8bebd4cc24d51bc4bf38508bbcd7d", true);

    request.onload = function() {

        data = JSON.parse(this.response);

        if (request.status == 200) {
            data["articles"].forEach(news => {
                console.log(news);
            });

        }
    }

    request.send();
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
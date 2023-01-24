import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
export class News extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=b7e46e560a6140d5bbea970ae5a8c381";
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNext = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=b7e46e560a6140d5bbea970ae5a8c381&page=${
      this.state.page + 1
    }&pageSize=20`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=b7e46e560a6140d5bbea970ae5a8c381&page=${
      this.state.page - 1
    }&pageSize=20`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <div>
        <div className={`container`}>
          {this.state.loading && <Spinner />}
          <h1>NewsMonkey - Top Headlines:</h1>
          <div className="row m-3 py-3">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 mt-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgs={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="container d-flex justify-content-between">
          <button
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrev}
          >
            {"< Previous"}
          </button>
          <button
            className="btn btn-dark"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            onClick={this.handleNext}
          >
            {"Next >"}{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default News;

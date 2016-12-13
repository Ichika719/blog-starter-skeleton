import 'isomorphic-fetch';
import React, { Component } from 'react';


class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    const {id} = this.props;
    fetch(`api/articles`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((articles) => {
        console.log(articles);
        this.setState({
          articles,
        });
      });
  }

  render() {
    const {articles} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            { articles.map((article, index) => (
              <a href={`#/articles/${article._id}`} key={index}>{article.title}</a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;

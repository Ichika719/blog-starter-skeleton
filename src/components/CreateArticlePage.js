import 'isomorphic-fetch';
import React, { Component } from 'react';

class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      tag: '',
    };
  }

  handleSubmitClick = () => {
    const confirm = window.confirm('確定要新增文章嗎？');
    const {title, content, tags} = this.state;
    console.log({
          title, content, tags
        });
    if (confirm) {
      fetch(`api/articles`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title, content, tags
        }),
      }).then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(article) {
          alert('success');
        });
    }
  }

  handleAddTag = () => {
    const {tags, tag} = this.state;
    const nextTags = [...tags, tag];
    this.setState({ tags: nextTags, tag: '' });
  };

  render() {
    const {title, content, tags, tag} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-info pull-right"
              role="button"
              onClick={this.handleSubmitClick}
            >送出</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input value={title} onChange={ (event) => { this.setState({ title: event.target.value}); }} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            { tags.map((tag, index) => <button className="btn btn-default" key={index}>{tag}</button>) }
            <input value={tag} onChange={ (event) => { this.setState({ tag: event.target.value}); }} />
            <button onClick={ this.handleAddTag }>add</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <textarea value={content} onChange={ (event) => { this.setState({ content: event.target.value}); }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticlePage;

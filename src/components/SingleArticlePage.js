import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';

class SingleArticlePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      isEditing: false,
      reload: true,
    };
  }

  componentDidMount() {
    const {reload} = this.state;
    if (reload) { this.reload(); }
  }

  componentDidUpdate() {
    const {reload} = this.state;
    if (reload) { this.reload(); }
  }

  reload = () => {
    console.log('reload');
    const {id} = this.props;
    fetch(`api/articles/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((article) => {
        this.setState({
          ...article,
          isEditing: false,
          reload: false,
        });
      });
  };

  handleTagsChange = () => {};

  handleTitleChange = () => {};

  handleContentChange = () => {};

  handleDelClick = () => {
    const {id} = this.props;
    fetch(`api/articles/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((article) => {
        alert('deleted');
        this.setState({
          title: '', content: '', tags: [], tag: ''
        })
      });
  };

  handleEditClick = () => {
    const {isEditing, title, content, tags} = this.state;
    if (isEditing) {
      const {id} = this.props;
      fetch(`api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title, content, tags
        }),
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then((article) => {
          alert('updated');
          this.setState({ isEditing: false });
        });
    } else {
      this.setState({
        isEditing: true,
      });
    }
  };

  renderTitle = () => {
    const {title, isEditing} = this.state;
    if (isEditing) {
      return (
        <div className="input-group">
          <input className="form-control" value={title} onChange={ (event) => { this.setState({ title: event.target.value}); }} />
        </div>
      );
    } else {
      return <h3>{title}</h3>;
    }
  };

  handleAddTag = () => {
    const {tags, tag} = this.state;
    const nextTags = [...tags, tag];
    this.setState({ tags: nextTags, tag: '' });
  };

  renderTags = () => {
    const {tags, tag, isEditing} = this.state;
    if (isEditing) {
      return [
        tags.map((tag, index) => <button className="btn btn-default" key={index}>{tag}</button>),
        (<div className="input-group">
          <input value={tag} onChange={ (event) => { this.setState({ tag: event.target.value}); }} />
        </div>),
        <button className="btn btn-primary" onClick={ this.handleAddTag }>add</button>,
      ];
    } else {
      return tags.map((tag, index) => <button className="btn btn-default" key={index}>{tag}</button>);
    }
  };

  renderContent = () => {
    const {content, isEditing} = this.state;
    if (isEditing) {
      return <input value={content} onChange={ (event) => { this.setState({ content: event.target.value}); }} />;
    } else {
      return (
        <div className="panel panel-default">
          <div className="panel-body">
            <p>{content}</p>
          </div>
        </div>
      );
    }
  };

  render() {
    const { isEditing } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              {this.renderTitle()}
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12">
            Tags: {this.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.renderContent()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-info"
              role="button"
              onClick={this.handleEditClick}
            >{isEditing ? '確認' : '編輯'}</button>
            {isEditing ? null :
            <button
              className="btn btn-warning"
              role="button"
              onClick={this.handleDelClick}
            >刪除</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticlePage;

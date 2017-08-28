import React, { Component } from 'react';
import  TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import request from 'superagent';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      synopsis: '',
    }
  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleAuthor = (event) => {
    this.setState({
      author: event.target.value,
    });
  }

  handleSynopsis = (event) => {
    this.setState({
      synopsis: event.target.value,
    });
  }

  handleSubmit = () => {
    console.log('the state right now is: ', this.state);
    request
      .post(`http://localhost:8080/api/book`)
      .send({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis,
      })
      .end((err, res)=> {        
        if (res.status === 201) {
          console.log('Done', res.body.message);
        }
      });
  }

  render() {

    return (
      <div>
        <TextField
          id="Author"
          floatingLabelText="Author"
          value={this.state.author}
          onChange={this.handleAuthor}
        />
        <br />
        <TextField
          id="Title"
          floatingLabelText="Title"
          value={this.state.title}
          onChange={this.handleTitle}
        />
        <br />
        <TextField
          id="Synopsis"
          floatingLabelText="Synopsis"
          value={this.state.synopsis}
          onChange={this.handleSynopsis}
        />
        <br />
        <FlatButton label="Submit" primary={true} onClick={this.handleSubmit} />
      </div>
    )
  }

}

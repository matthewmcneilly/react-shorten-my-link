import React, { Component } from 'react';

class LinkCreate extends Component {
  // when using component state init within the constructor
  constructor(props) {
    super(props);

    this.state = { error: '' };
  }

  handleSubmit(event) {
    // prevent default action of refreshing the page
    event.preventDefault();

    // meteor method required because insecure package has been removed
    // with insecure any client can insert/update/delete to any collection at will
    // which we dont want

    // references the input elements value i.e. url that we want to save
    // passes this to the meteor method links (imports>collections?links.js)
    // which is run on both the client and server side
    // 3rd argument is the error if one is generated
    Meteor.call('links.insert', this.refs.link.value, (error) => {

      // console.log("attempted to save some text");

      // if error exists update state error message
      // updating state re-renders app
      // user can then see error message
      if (error) {
        this.setState({ error: 'Enter a valid URL' });
      } else {
        // if no error clear the state error message
        this.setState({ error: '' });
        // clear input field
        this.refs.link.value = '';
      }
    });
  }

  // when user submits the form i.e. presses the button call handleSubmit
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Link to shorten</label>
          <input ref="link" className="form-control" />
        </div>
        <div className="text-danger">{this.state.error}</div>
        <button className="btn btn-primary">Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;

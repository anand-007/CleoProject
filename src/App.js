import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchUser, retrieveGUID, shortenURL} from './bitlyclient.js';

// USER URL - https://api-ssl.bitly.com/v4/user
// KEY - 09957d150f25858794e5ff2b3f64ea8a44ea3b3d
// Bearer 09957d150f25858794e5ff2b3f64ea8a44ea3b3d

// USER API - https://api-ssl.bitly.com/v4/user

/**
{
"created": "2019-01-08T20:46:03+0000",
"modified": "2019-01-08T20:46:04+0000",
"login": "cleoeng",
"is_active": true,
"is_2fa_enabled": false,
"name": "cleoeng",
"emails": [
  {
"email": "engineering@hicleo.com",
"is_primary": true,
"is_verified": true
}
],
"is_sso_user": false,
"default_group_guid": "Bj18kE0fyOx"
}
**/

// Groups API - https://api-ssl.bitly.com/v4/groups GET GUID
//  Sample response 
/**
{
"groups": [
  {
"created": "2019-01-08T20:46:03+0000",
"modified": "2019-01-08T20:46:03+0000",
"bsds": [],
"guid": "Bj18kE0fyOx",
"organization_guid": "Oj18kzk2UmF",
"name": "cleoeng",
"is_active": true,
"role": "org-admin",
"references": {
"organization": "https://api-ssl.bitly.com/v4/organizations/Oj18kzk2UmF"
}
}
],
}

POST SHORTEN API - https://api-ssl.bitly.com/v4/shorten

PAYLOAD

{
 "long_url":"http://www.google.com",
 "group_guid":"Bj18kE0fyOx"
}

RESPONSE:

{
"created_at": "1970-01-01T00:00:00+0000",
"id": "bit.ly/2FhIsMY",
"link": "http://bit.ly/2FhIsMY",
"custom_bitlinks": [],
"long_url": "http://www.google.com/",
"archived": false,
"tags": [],
"deeplinks": [],
"references": {
"group": "https://api-ssl.bitly.com/v4/groups/Bj18kE0fyOx"
}
}

**/



class App extends Component {


  constructor(props){

    super(props);
    this.state = {"user":{},"shortURL":""}

  }

  componentDidMount(){

    var self = this;
    var userDetail = {};
    fetchUser().then(function(response){
      var userResponse = response.json();
      return userResponse;
    }).then(function(userJson){
      userDetail.name = userJson.name;
      self.setState({"user":userDetail});
    });

  }

  shortenUrl(){

    var self = this;
    var guid = "";

    retrieveGUID().then(function(response){
      var guidResponse = response.json();
      return guidResponse;
    }).then(function(guidJSON){
      guid = guidJSON.groups[0].guid;
      var data = {};
      data.long_url = document.getElementById('longUrlText').value;
      data.group_guid = guid;
      shortenURL(data).then(function(shortenResponse){
        var shortenURLResponse = shortenResponse.json();
        return shortenURLResponse;
      }).then(function(shortResponse){
        self.setState({"shortURL":shortResponse.link});
      });
    });

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Name: {this.state.user && this.state.user.name}</p>
          <p>Long URL </p><input type="text" id="longUrlText"></input>
          <p> Short URL </p><p>{this.state.shortURL}</p>
          <button onClick={this.shortenUrl.bind(this)}>Shorten URL</button>
        </header>
      </div>
    );
  }
}

export default App;

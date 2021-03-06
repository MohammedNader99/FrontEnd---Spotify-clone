import React ,{ Component} from 'react';
import './HomePageSidebar.css';
import { NavLink, Link } from "react-router-dom";
import CreatePlaylist from '../PlaylistsComponent/CreatePlaylist';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actionTypes from "../../Store/actions";
import { BASEURL } from '../../Constants/BaseURL';
 
/** Class HomepageSidebar 
 * @category HomePage
 * @extends Component
 */
export class HomePageSidebar extends Component{
  constructor(props){
    super(props);
    this.state = {
    /**Array of playlists in the bottom
   * @memberof HomePageSidebar
   * @type {Array<playlist>}
   */
    playlistArray:[],
     /**Array of playlists to be show cased
   * @memberof HomePageSidebar
   * @type {Array<playlist>}
   */
    total:"",
    }
  }
   /**A function to show the popping area for creating a new playlist
   * @memberof HomePageSidebar
   * @func toggle
   */
  toggle()
  {
  /**A function to show the popping area for creating a new playlist
   * @memberof HomePageSidebar
   * @var blur
   */
    var blur=document.getElementById('blur');
    blur.classList.toggle('active')
      /**A function to show the popping area for creating a new playlist
   * @memberof HomePageSidebar
   * @var pop
   */
    var popup=document.getElementById('popup');
    popup.classList.toggle('active')
  }
    /**A function that fires once the homepage sidebar is called in the web player
   * @memberof HomePageSidebar
   * @func componentDidMount
   */
  componentDidMount() {
    
    const requestOptions = {
      method:"GET",
      // headers:{'x-auth':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThhNzAxOTU0ZmU3NTJjMTQ5OGY3MjEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg2MTMxOTc0fQ.5CqQJG2E8n_1h8-_XC_tb1HbnVuIXstLQpTyjoWK-Dk'}
    }
    
    const url = BASEURL+"/get-playlists"; 
    fetch(url,requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.playlists)
        {
          
        const list = data.playlists.map(item => {
          return (
            <li className="List2"><a href="/webplayer/playlist" >{item.playlistName}</a></li>
          )
        }
        
        )
        this.setState({total:list});
      }
    
      })
      .catch((error)=>{
        console.log(error);
      })
      
    }



render() {
 return (

    <div className="wrapper">
      
      <div className="sidebar">
        
        <Link to="/"><img className="logo"  src="https://i.ya-webdesign.com/images/itunes-logo-white-png-1.png" alt="logo"/></Link>
        
          <ul>
              <li><NavLink  className="List" to="/webplayer/home/"><i className="fas fa-home"></i>Home</NavLink></li>
              <li><NavLink   className="List" to="/webplayer/search/"><i className="fas fa-search" aria-hidden="true"></i>Search</NavLink></li>
              <li><NavLink  className="List" to="/webplayer/yourlibrary/"><i className="fas fa-bookmark" aria-hidden="true"></i>Your library</NavLink></li>
              <p id="Playlist">Playlists</p>
              <li><a className="List2" href="#" data-toggle="modal" data-target="#create-new-playist"><i className="fas fa-plus-square fa-2x" aria-hidden="true"></i>Create Playlist</a></li>
              <li><NavLink   className="List2" to="/webplayer/likedsongs/"><i className="fas fa-heart fa-2x" aria-hidden="true"></i>Liked Songs</NavLink></li>
              <hr/>
              <div id="my-playlist" className="my-playlists">
                {this.state.total}
              </div>
          </ul> 
      </div>
    
    </div>

);
}
} 

/** A function connecting component to redux store
 * @memberof HomePageSidebar
 * @func mapStateToProps
 * @param {*} state 
 */
const mapStateToProps = state => {

  return {
    userID:state.userID
  };

};

/** A function connecting component to redux store
 * @memberof HomePageSidebar
 * @func mapDispatchToProps
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {

  return {

    onPlaylistClicked : (itemID) => dispatch ({type: actionTypes.SELECT_PLAYLIST , value: itemID})
  };

};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomePageSidebar));
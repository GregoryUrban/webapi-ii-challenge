import React, {Component} from 'react';
import axios from 'axios';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
}

componentDidMount(){

  console.log('CDM console log')
  axios.get("http://localhost:5000/api/posts")
       .then(res => this.setState({ posts: res.data }))
       .catch(error => console.log(error))

}

render() {
  return (
    <div className="App">
      {this.state.posts.map(post => 
        <div>{post.id} {post.title} {post.contents}</div>
      )}
    </div>
  );
}

}
//   return (
//     <div className="App">
//     {this.state.posts.map(post => 
//           <div>{post.id} <strong>{post.title}</strong> {post.contents}</div>
//         )}
//     </div>
//   );
// }

export default App;

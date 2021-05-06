import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, TransitionGroup, Image } from "semantic-ui-react";
import { AuthContext } from "../context/auth";


import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from '../util/graphql';


function Home() {
  const { user } = useContext(AuthContext);

  let posts = "";
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    posts = data.getPosts;
  }

  return (
    <Grid columns="three">
      <Grid.Row className="page--title">
         <Image
              src="https://kitetribe.org/wp-content/uploads/2017/09/kitetribe-01_low-1.png"
              size="small"
              float="center"
            />
        <h1>Kite Girls, El Gouna - Our notice board</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <p>Loading Posts...</p>
        ) : (
          <Transition.Group>
            {posts &&
          posts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 20, minWidth: 320 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}



export default Home;

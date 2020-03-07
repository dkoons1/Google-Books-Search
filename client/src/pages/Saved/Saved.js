import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Saved extends Component {
  // Setting our component's initial state
  state = {
    savedBooks: [],
    q: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

//   shortenUrl = book => {
//     return {
//       _id: book.id,
//       title: book.volumeInfo.title,
//       authors: book.volumeInfo.authors,
//       description: book.volumeInfo.description,
//       image: book.volumeInfo.imageLinks.thumbnail,
//       link: book.volumeInfo.previewLink
//     }
//   }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getSaved()
      .then(res => this.setState({ savedBooks: res.data}))
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

//   saveBooks = event => {
//     console.log('saved')
//     let saved = this.state.books.filter(book => book._id === event._id)
//     API.saveBook(saved)
//       .then(res => this.loadBooks())
//       .catch(err => console.log(err));
  
//   };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
               // disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
                // q = {this.state.q}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          </Row>


          <Row>
          <Col size="sm-12">
            {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
            {this.state.savedBooks.length ? (
              <List>
                {this.state.savedBooks.map(book => {
                  return (
                    <ListItem key={book._id}>
                      {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                      <img src={book.image}/>
                      <br></br>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.authors}
                        </strong>
                      </a>
                      <p>
                        {book.description}
                      </p>
                      
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          </Row>
      </Container>
    );
  }
}

export default Saved;

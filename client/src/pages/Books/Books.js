import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import ViewBtn from "../../components/ViewBtn";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    q: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  shortenUrl = book => {
    return {
      _id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
      link: book.volumeInfo.infoLink
    }
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks(this.state.title)
      .then(res => this.setState({ books: res.data.items.map(book => this.shortenUrl(book)) }))
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  saveBooks = id => {
    console.log("saved")
    let saved = this.state.books.filter(book => book._id === id)
    console.log(saved)
    API.saveBook(saved)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
     this.loadBooks()
    // if (this.state.title && this.state.author) {
    //   this.loadBooks({
    //     title: this.state.title,
    //     author: this.state.author,
    //     synopsis: this.state.synopsis
    //   })
    //     .then(res => this.loadBooks())
    //     .catch(err => console.log(err));
    // }
  };

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
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <ViewBtn href={book.link}/>
                      <br></br>
                      <SaveBtn onClick={() => this.saveBooks(book._id)} />
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

export default Books;

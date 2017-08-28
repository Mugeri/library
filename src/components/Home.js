import React, { Component } from 'react';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableBody,
  TableRowColumn,
} from 'material-ui';
import { FlatButton, RaisedButton, IconButton} from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import request from 'superagent';
import Header from './Header/Header';
import Dialog from 'material-ui/Dialog';
import Create from './Create';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      booksArray: [],
      chosen: '',
      borrowOpen: false,
      returnOpen: false,
      isCreate: false,
    }
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleBorrow = this.handleBorrow.bind(this);
  }

  componentDidMount () {
    request
    .get('http://localhost:8080/api/book')
    .end((err, res) => {
      this.setState({
        books: res.body
      });
    })
  }

  handleRowSelection = (id) => {
    Promise.resolve(this.state.books.find(x => x._id === id))
    .then((book) => {
      if (!book.date_borrowed) {
         return this.setState({
          chosen: book,
          borrowOpen: true,
        })
      }
      return this.setState({
        chosen: book,
        returnOpen: true,
      })
    })
    .catch((err) => {
      console.log(err);
    })

  }

  handleClose = () => {
    this.setState({
      borrowOpen: false,
      returnOpen: false,
      isCreate: false,
    });
  }

  handleBorrow = () => {

    console.log('UPDATING BOOK: ', this.state.chosen);
    let book = this.state.chosen;
    book.date_borrowed = Date.now();
    console.log('UPDATED?: ', book);
    request
      .put(`http://localhost:8080/api/book/${book._id}`)
      .send({
        title: book.title,
        author: book.author,
        synopsis: book.synopsis,
        dateOut: book.date_borrowed,
        dateIn: null,
        borrowed: true,
      })
      .end((result) => {
        console.log(result);
      })
  }

  handleReturn = () => {
    let book = this.state.chosen;
    book.date_returned = Date.now();
    console.log('UPDATED?: ', book);
    request
      .put(`http://localhost:8080/api/book/${book._id}`)
      .send({
        title: book.title,
        author: book.author,
        synopsis: book.synopsis,
        dateOut: null,
        dateIn: book.date_returned,
        borrowed: true,
      })
      .end((result) => {
        console.log(result);
      })
  }

  onCreate = () => {
    this.setState({
      isCreate: true,
    })
  }
  onDelete = (book) => {
        request
        .delete(`http://localhost:8080/api/book/${book.id}`)
        .end((err, res) => {
          if(res) {
            console.log(res);
            this.forceUpdate();
          }
        });
  }

  render() {
    const {
      returnOpen,
      borrowOpen,
      chosen,
      books,
      booksArray,
      isCreate,
    } = this.state;

    const actions = [
      <FlatButton label="Yes" primary={true} onClick={() => {
         if (borrowOpen)  return this.handleBorrow();
         return this.handleReturn();
      }} />,
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />
    ];

    const loadedBooks = books.map((book) => {
      booksArray.push(book)
      return (
        <TableRow key={book._id}>
        <TableRowColumn> {book.title} </TableRowColumn>
        <TableRowColumn> {book.author} </TableRowColumn>
        <TableRowColumn> {book.synopsis} </TableRowColumn>
        <TableRowColumn> {!book.date_borrowed || book.date_returned ? <p>available</p> : <p>borrowed</p>} </TableRowColumn>
        <TableRowColumn>
          {!book.date_borrowed || book.date_returned ?
            <FlatButton label="Borrow" primary={true} onClick={() => this.handleRowSelection(book._id)}/> :
            <FlatButton label="Return" primary={true} onClick={() => this.handleRowSelection(book._id)}/>
          }
        </TableRowColumn>
        <TableRowColumn>
          <IconButton tooltip="SVG Icon" onClick={() => this.onDelete({id: book._id, title: book.title})}>
            <ActionDelete />
          </IconButton>
        </TableRowColumn>
        </TableRow>
      )
    });

    return (
      <div>
      <Header/>
      <br/>
      <RaisedButton label="Add a book to the library"  secondary={true} onClick={this.onCreate} />
      <Table selectable={false}>
        <TableHeader adjustForCheckbox={true}>
        <TableRow>
        <TableHeaderColumn> Title </TableHeaderColumn>
        <TableHeaderColumn> Author </TableHeaderColumn>
        <TableHeaderColumn> Synopsis </TableHeaderColumn>
        <TableHeaderColumn> State </TableHeaderColumn>
        <TableHeaderColumn> '' </TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody>
        {loadedBooks}
        </TableBody>
      </Table>
      {borrowOpen &&
      <Dialog
        title = "Borrow book"
        actions = {actions}
        modal={false}
        open={borrowOpen}
        onRequestClose={this.handleClose}
      >
        Are you sure, you want to borrow {chosen.title} ?
      </Dialog>
      }
      <Dialog
        title = "Return book"
        actions = {actions}
        modal={false}
        open={returnOpen}
        onRequestClose={this.handleClose}
      >
        Are you sure, you want to return {chosen.title} ?
      </Dialog>
      {isCreate &&
        <Dialog
          modal={false}
          open={isCreate}
          actions={actions[1]}
          onRequestClose={this.handleClose}
        >
          <Create />
        </Dialog>}
      </div>
    )
  }

}

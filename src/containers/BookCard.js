import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as booksActions from '../actions/books'

class BookCard extends PureComponent {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    fetchBook: PropTypes.func.isRequired,
    isLoaded: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { books } = this.props
    if (!books.find(el => el.id === this.props.match.params.id)) {
      this.props.fetchBook(this.props.match.params.id)
    }
  }

  render() {
    const { books, isLoaded } = this.props
    const book = books.filter(el => el.id === this.props.match.params.id)[0]
    return (
      isLoaded && (
        <Intro>
          <div>
            <h2>{book.volumeInfo.title}</h2>
            <h4>
              {book.volumeInfo.authors && book.volumeInfo.authors.length > 0 && book.volumeInfo.authors.join(', ')}
            </h4>
            <br />
            <h4>
              {book.volumeInfo.publishedDate &&
                new Date(book.volumeInfo.publishedDate).toLocaleString('ru', { year: 'numeric' })}
            </h4>
            <br />
            <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail} alt={``} />
            <p>{book.volumeInfo.description ? book.volumeInfo.description : ''}</p>
            <p>
              <a href={book.volumeInfo.previewLink}>Предварительный просмотр</a>
            </p>
          </div>
        </Intro>
      )
    )
  }
}

export default connect(
  state => ({
    books: state.books.items,
    isLoaded: state.books.isLoaded,
  }),
  { ...booksActions }
)(BookCard)

const Intro = styled.div`
  width: 70%;
  margin: 0 auto;

  p {
    font-size: 15px;
    margin: 0 20px;
    text-align: left;
    line-height: 1.6;
  }

  h4 {
    margin: 0 0;
  }
  img {
    float: left;
    width: 200px;
    height: 300px;
    margin-right: 20px;
  }
`

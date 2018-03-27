import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
        isLoaded &&
          <div>
            <h2>{book.volumeInfo.title}</h2>
          </div>
      )
    }
}

  export default connect(
  state => ({
      books: state.books.items,
      isLoaded: state.books.isLoaded,
    }),{...booksActions})(BookCard)


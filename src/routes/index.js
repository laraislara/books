import React from 'react'
import { Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import createHistory from 'history/createBrowserHistory';
import { Header, BooksList, BookCard } from '../containers'

const Container = styled.div`text-align: center;`

const history = createHistory();

function Routes() {
  return (
    <Router history={history}>
      <Container>
        <Route path="/" component={Header} />
        <Route exact path="/books" component={BooksList} />
        <Route path="/books/:id" component={BookCard} />
      </Container>
    </Router>
  )
}

export default Routes

import React, { useState } from 'react'
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap'

export const feedbackCards = () => {


    const cards = [
        { id: 1, title: 'Card 1', text: 'This is card number 1' },
        { id: 2, title: 'Card 2', text: 'This is card number 2' },
        { id: 3, title: 'Card 3', text: 'This is card number 3' },
        { id: 4, title: 'Card 4', text: 'This is card number 4' },
        { id: 5, title: 'Card 5', text: 'This is card number 5' },
        { id: 6, title: 'Card 6', text: 'This is card number 6' },
        { id: 7, title: 'Card 7', text: 'This is card number 7' },
        { id: 8, title: 'Card 8', text: 'This is card number 8' },
        { id: 9, title: 'Card 9', text: 'This is card number 9' },
        { id: 10, title: 'Card 10', text: 'This is card number 10' },
      ];
    
      const [currentPage, setCurrentPage] = useState[1];
      const cardsPerPage = 4;
    
      const indexOfLastCard = currentPage * cardsPerPage;
      const indexOfFirstCard = indexOfLastCard - cardsPerPage;
      const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
      const totalPages = Math.ceil(cards.length / cardsPerPage);



  return (
    <Container className="my-5">
    <Row>
      {currentCards.map((card) => (
        <Col key={card.id} sm={6} md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
      {[...Array(totalPages).keys()].map(number => (
        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
          {number + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  </Container>
  )
}

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

import "../../assets/CSS/News.css"
import { getnewsData } from '../../Services/NewsAPiService/NewsAPIService';
export const News = () => {


    const [newsData, setNewsData] = useState([]);
    const getnewsDataFrom = async () => {
        try {
            let responseData = await getnewsData();
            let data = responseData.data.articles;
            setNewsData(data);
            // console.log(data);
        } catch (error) {
            console.error('Error fetching the news data:', error);
        }
    };

    useEffect(() => {
        getnewsDataFrom();
    }, []);


    console.log(newsData);



    return (
        <>

            <Container className='newsHeader'>

                <Row>
                    <h1>Latest News on Charities</h1>
                    <p>Stay updated with the most recent developments in the world of charities. From impactful stories to major events, we bring you the latest news to keep you informed.</p>
                </Row>

            </Container>

            <Container id='newsContainer'>
                <Row>
                    {
                        newsData.map((data) => {
                            return (
                                <>
                                    <Col lg={3} className='mb-4'>
                                        <Card id='newsCard' style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={data.
                                                urlToImage
                                            } />
                                            <Card.Body id='card-body'>
                                                <Card.Title id='newsTitle'>{data.title} </Card.Title>
                                                <Card.Text>
                                                   {data.description
                                                   }
                                                </Card.Text>
                                                <Button id='donate-button' href={data.url} >Read More</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            )
                        })
                    }
                </Row>

            </Container>



        </>
    )
}


/*
 <Col lg={3}>
    <Card id='newsCard' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body id='card-body'>
        <Card.Title id='newsTitle'>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button id='donate-button'>Read More</Button>
      </Card.Body>
    </Card> 
    </Col>

*/

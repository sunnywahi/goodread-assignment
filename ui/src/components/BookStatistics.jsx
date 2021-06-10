import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Jumbotron from "react-bootstrap/Jumbotron";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

{/* <h1>This helps to do the rest API calls and do statistics on demand</h1>
*/}

class BookStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            appState: {
                "author_with_lowest_5_stars": "N/A",
                "author_with_highest_5_stars": "N/A",
                "title_with_highest_5_stars": "N/A",
                "title_with_lowest_5_stars": "N/A",
                'title_with_highest_average_rating':  "N/A",
                'title_with_lowest_average_rating':  "N/A",
                "book_name_with_min_page_count": "N/A",
                "book_name_with_max_page_count": "N/A",
                "lowest_5_star_rating": "N/A",
                "highest_5_star_rating": "N/A",
                "lowest_average_rating": "N/A",
                "highest_average_rating": "N/A",
                "min_page_count": "N/A",
                "max_page_count": "N/A",
                "records": "N/A",
            },
        };
    }

    componentDidMount() {
        fetch("http://localhost:8090/info")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    appState: data
                })
            );
    }

    render() {
        const handleShow = () => {
            const currentState = this.state.appState;
            this.setState({
                showModal: true,
                appState: currentState
            })
        }
        const handleClose = () => {
            const currentState = this.state.appState;
            this.setState({
                showModal: false,
                appState: currentState
            })
        }

        return (
            <>
                <Jumbotron>
                    <h1>Hello Data Science Team!</h1>
                    <p>
                        Here are some interesting books from Goodread.
                    </p>
                    <p>
                        <Button variant="primary" onClick={handleShow}>
                            Show Data Trends
                        </Button>
                    </p>
                </Jumbotron>
                <Modal show={this.state.showModal}
                       size="lg"
                       onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Data Trends</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Accordion defaultActiveKey="2">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        By author
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div>Highest 5 stars: {this.state.appState.author_with_highest_5_stars}</div>
                                        <div>Lowest 5 stars: {this.state.appState.author_with_lowest_5_stars}</div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        By page counts
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <div>Title: {this.state.appState.book_name_with_max_page_count} has maximum pages with count {this.state.appState.max_page_count}</div>
                                        <div>Title: {this.state.appState.book_name_with_min_page_count} has minimum pages with count {this.state.appState.min_page_count}</div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} eventKey="2">
                                        By star rating
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <div>Title: {this.state.appState.title_with_highest_5_stars} has highest 5 star rating of {this.state.appState.highest_5_star_rating} </div>
                                        <div>Title: {this.state.appState.title_with_lowest_5_stars} has lowest 5 star rating of {this.state.appState.lowest_5_star_rating} </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} eventKey="3">
                                        By average rating
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        <div>Title: {this.state.appState.title_with_highest_average_rating} has highest 5 star rating of {this.state.appState.highest_average_rating} </div>
                                        <div>Title: {this.state.appState.title_with_lowest_average_rating} has lowest 5 star rating of {this.state.appState.lowest_average_rating} </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} eventKey="4">
                                        Total No. of Records
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body>
                                        <div>Total No Of Records: {this.state.appState.records}</div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default BookStatistics;
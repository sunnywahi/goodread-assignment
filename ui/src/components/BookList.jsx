import MaterialTable from "material-table";
import React from "react";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BookList = () => {
    return (
        <MaterialTable
            options={{
                search: true
            }}
            columns={[
                { title: "Title", field: "title", sorting: false, searchable: true },
                { title: "Author", field: "author", sorting: false, searchable: false },
                { title: "Average Rating", field: "average_rating", type: "numeric", searchable: false, sorting: false },
                { title: "Details Link", field: "amazon_redirect_link", sorting: false, searchable: false,
                    render: rowData => <a href={rowData.amazon_redirect_link} target="_blank">Buy Here</a>
                },
                { title: "Id", field: "id", sorting: false, hidden: true, searchable: false },
            ]}
            data = { query =>
                new Promise((resolve, reject) => {
                    let url = "http://localhost:8090/loadData?";
                    url += 'per_page=' + query.pageSize
                    url += '&page=' + query.page
                    url += '&search=' + query.search
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                            resolve({
                                data: result.data,
                                page: result.page,
                                totalCount: result.total,
                            })
                        })
                })
            }
            detailPanel={[
                {
                    tooltip: 'Show Details',
                    render: rowData => {
                        return (
                            <Container>
                                <Row>
                                    <Col>Publisher</Col>
                                    <Col sm={10}>{rowData.publisher}</Col>
                                </Row>
                                <Row>
                                    <Col>Published date</Col>
                                    <Col sm={10}>{rowData.date_published}</Col>
                                </Row>
                                <Row>
                                    <Col>Number of pages</Col>
                                    <Col sm={10}>{rowData.number_of_pages}</Col>
                                </Row>
                                <Row>
                                    <Col>Description</Col>
                                    <Col sm={10}>{rowData.description}</Col>
                                </Row>
                            </Container>
                        )
                    },
                }
            ]}
            title="Book Lists"
        />
    )
};

export default BookList;

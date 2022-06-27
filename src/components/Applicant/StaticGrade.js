import {Card, Col, Row} from "react-bootstrap";
import {useSelector} from "react-redux";


export default function StaticGrade({staticGrade, _useSelector = useSelector}) {

    const users = _useSelector(state => state.userReducer.users)
    const gradedBy = users.find(element => element.id === staticGrade.gradedBy)

    console.log(gradedBy)
    return <Card>
        <Card.Header>
            <Row>
                <Col className="text-start">
                    Quiz ID: {staticGrade.quizTemplateId}
                </Col>
                <Col className="text-end">
                    Graded By: {gradedBy.username}
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>Grade: {staticGrade.grade}</Card.Body>
    </Card>

}
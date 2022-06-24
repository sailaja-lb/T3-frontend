import {Card} from "react-bootstrap";


export default function StaticGrade({staticGrade}) {

    return <Card>
        <Card.Header>{staticGrade.quizTemplateId}</Card.Header>
        <Card.Body>{staticGrade.grade}</Card.Body>
        <Card.Footer>{staticGrade.gradedBy}</Card.Footer>
    </Card>

}
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab } from 'react-bootstrap';
import './App.css';
import todos from './todoItems';

const TodoList = () => {

    const [todoItems] = useState(todos);

    const getColorVariant = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24)); // Days difference

        if (daysLeft < 2) return 'danger';
        if (daysLeft < 4) return 'warning';
        if (daysLeft < 7) return 'success';
        return 'primary';
    };

    return (
        <Container>
            <h1>Assignment 2: ToDo List</h1>

            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="todoTitle">
                            <Form.Label>ToDo Item</Form.Label>
                            <Form.Control type="text" placeholder="Add todo item" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="todoDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-3">Add Todo</Button>
            </Form>

            <Tab.Container id="todo-list" defaultActiveKey={`#todo0`}>
                <Row>
                    <Col sm={4}>
                        <ListGroup role="tablist">
                            {todoItems.map((todo, index) => (
                                <ListGroup.Item
                                    key={index}
                                    action
                                    href={`#todo${index}`}
                                    variant={getColorVariant(todo.dueDate)} 
                                    className={`list-group-item-${getColorVariant(todo.dueDate)}`} 
                                >
                                    {todo.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {todoItems.map((todo, index) => (
                                <Tab.Pane key={index} eventKey={`#todo${index}`}>
                                    <h4>{todo.title}</h4>
                                    <p contentEditable suppressContentEditableWarning>{todo.description}</p>
                                    <Form.Control type="date" defaultValue={todo.dueDate} />
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
  );
}

export default TodoList;
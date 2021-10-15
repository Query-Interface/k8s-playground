import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import { fetchExercice, fetchPods, fetchSecrets, checkSecrets, setSelectedTask } from './appSlice';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import Graph from '../features/Graph';
import Task from '../features/Task';
import Help from '../features/Help';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const exercice = useSelector((state: RootState) => state.app.exercice);
    const selectedTaskId = useSelector((state: RootState) => state.app.selectedTaskId); 
    const pods = useSelector((state: RootState) => state.app.pods);
    const secrets = useSelector((state: RootState) => state.app.secrets);

    useEffect(() => {
        const timer = setInterval(
          () => {
            dispatch(fetchPods());
            dispatch(fetchSecrets());
          }, 30000);
        return () => clearInterval(timer);
      }, [dispatch]);
    
    useEffect(() => {
      dispatch(fetchExercice());
    }, [dispatch]);

    useEffect(() => {
      dispatch(checkSecrets(exercice, secrets));
    }, [secrets]);

    if (exercice !== null && selectedTaskId == null) {
      dispatch(setSelectedTask(exercice?.tasks[0].id));
      // TODO: also select node in graph
    }

      return <React.Fragment>
        <Navbar variant="dark" style={{backgroundColor:"#252F3F"}}>
          <Navbar.Brand href="#">k8s Playground</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav >
              <Nav.Link href="https://stackoverflow.com/questions/tagged/kubernetes" style={{display: "inline-flex"}} title="kubernetes on Stackoverflow">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="#fff" width="16"><path d="M17.4 20.2v-5.4h1.8V22H3v-7.2h1.8v5.4h12.6M6.8 14.3l.3-1.7 8.8 1.8-.3 1.8-8.8-1.9m1.1-4.2l.8-1.6 8.1 3.8-.7 1.6-8.2-3.8m2.3-4l1.1-1.4 7 5.8-1.2 1.4L10 6m4.7-4L20 9l-1.4 1-5.4-7 1.4-1m-8 16.5v-1.8h9v1.8h-9z"></path></svg>
              </Nav.Link>
              <Nav.Link href="https://kubernetes.io/docs/home/" target="_blank" title="kubernetes documentation">k8s doc</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid={true} style={{height:"100%", marginTop:"-56px", paddingTop:"56px"}}>
        <Row style={{height:"100%", paddingLeft: "40px", paddingRight: "40px", paddingBottom: "20px"}}>
          <Col sm={8} style={{backgroundColor: "white", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px"}}>
            <h1>Graph</h1>
            <Graph />
          </Col>
          <Col sm={4} style={{backgroundColor: "white", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", maxHeight: "100%" }}>
            <Row style={{height:"50%", overflow:"auto"}}><Task /></Row>
            <Row style={{height:"50%", overflow:"auto"}}><Help /></Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>;
};

export default App;
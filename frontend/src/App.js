import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';

import { Layout } from 'antd';
import 'antd/dist/antd.css';
import * as ROUTE from './constants/routes';

const { Header, Content } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <Route path={ROUTE.TODOLIST} exact component={TodoList}></Route>
        <Route path={ROUTE.CREATE_TODO} component={CreateTodo}></Route>
        <Route path={ROUTE.EDIT_TODO} component={EditTodo}></Route>
      </Content>
    </Layout>
  </Router>
)

export default App;

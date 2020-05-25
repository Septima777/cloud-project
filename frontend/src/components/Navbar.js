import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Menu, Row, Col } from 'antd';
import * as ROUTE from '../constants/routes';

const Navigation = () => (
  <Row>
    <Col span={12}></Col>
    <Col span={12}>
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key='1'>
          <Link to={ROUTE.TODOLIST}>Todos</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to={ROUTE.CREATE_TODO}>Create Todo</Link>
        </Menu.Item>
      </Menu>
    </Col>
  </Row>
)

export default withRouter(Navigation)
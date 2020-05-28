import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as ROUTE from '../constants/routes'
import { Table, Rate } from 'antd';
import '../css/todolist.css'

const desc = ['Very low', 'Low', 'Medium', 'High', 'Very high'];

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title, record) => (
      <p className={record.completed === 1 ? 'completed' : ''}>
        {title}
      </p>
    )
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (description, record) => (
      <p className={record.completed === 1 ? 'completed' : ''}>
        {description}
      </p>
    )
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (rate, record) => (
      <span>
        <Rate tooltips={desc} value={record.completed === 1 ? 0 : rate} disabled />
      </span>
    )
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    render: (deadline, record) => (
      <p className={record.completed === 1 ? 'completed' : ''}>
        {deadline}
      </p>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Link to={`${ROUTE.EDIT_TODO}/${record.id}`}>Edit</Link>
    ),
  },
];

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/todos')
      .then((res) => {
        this.setState({
          todos: res.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getTodos = () => {
    var data = [];
    if (this.state.todos.length !== 0) {
      this.state.todos.map((todo) => {
        todo['key'] = todo.id
        return data.push(todo)
      })
    }
    return data
  }

  render() {
    return (
      <div className='container'>
        <Table columns={columns} dataSource={this.getTodos()} />
      </div>
    )
  }
}
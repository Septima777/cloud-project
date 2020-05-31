import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as ROUTE from '../constants/routes'
import { Table, Rate, Button } from 'antd';
import '../css/todolist.css'

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  desc = ['Very low', 'Low', 'Medium', 'High', 'Very high'];

  columns = [
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
      sorter: (a, b) => a.priority - b.priority,
      render: (rate, record) => (
        <span>
          <Rate tooltips={this.desc} value={record.completed === 1 ? 0 : rate} disabled />
        </span>
      )
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => a.deadline.split('-').reverse().join('') - b.deadline.split('-').reverse().join(''),
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
        <div>
          <Link to={`${ROUTE.EDIT_TODO}/${record.id}`}>Edit</Link>
          <Button
            type='link'
            danger
            onClick={() => this.onDelete(record.id)}
          >Delete</Button>
        </div>
      ),
    },
  ];

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/todos')
      .then((res) => {
        this.setState({
          todos: res.data
        })
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

  onDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/todos/remove/${id}`)
      .then(() => {
        axios
          .get('http://localhost:4000/api/todos')
          .then((res) => {
            this.setState({
              todos: res.data
            })
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className='container'>
        <Table columns={this.columns} dataSource={this.getTodos()} />
      </div>
    )
  }
}
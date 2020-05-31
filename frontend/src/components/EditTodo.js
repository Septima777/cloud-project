import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Rate, DatePicker, Button, Switch } from 'antd';
import axios from 'axios';
import moment from 'moment';
import * as ROUTE from '../constants/routes'

const { TextArea } = Input;

const desc = ['Very low', 'Low', 'Medium', 'High', 'Very high'];
const INITIAL_STATE = {
  id: '',
  title: '',
  description: '',
  priority: 3,
  deadline: '',
  completed: false
}

class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    var location = this.props.history.location.pathname
    var id = location.split('/')
    axios
      .get(`http://localhost:4000/api/todos/${id[2]}`)
      .then((res) => {
        this.setState({
          id: id[2],
          title: res.data[0].title,
          description: res.data[0].description,
          priority: res.data[0].priority,
          deadline: res.data[0].deadline,
          completed: res.data[0].completed === 1 ? true : false
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onPriorityChange = (value) => {
    this.setState({
      priority: value
    });
  }

  onDateChange = (date, dateString) => {
    this.setState({
      deadline: dateString
    });
  }

  onCompletedChange = (checked) => {
    this.setState({
      completed: checked
    });
  }

  onFinish = () => {
    const { id, title, description, priority, deadline, completed } = this.state
    const updateTodo = {
      title: title,
      description: description,
      priority: priority,
      deadline: deadline,
      completed: completed
    }

    axios
      .put(`http://localhost:4000/api/todos/update/${id}`, updateTodo)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTE.TODOLIST);
      })
      .catch(error => {
        this.setState({ error });
      })
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/todos/remove/${id}`)
      .then(() => {
        this.props.history.push(ROUTE.TODOLIST);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const { id, title, description, priority, completed } = this.state
    return (
      <div className='container'>
        <Form onFinish={this.onFinish}>
          <Form.Item
            label='Title'
            rules={[{ required: true, message: 'Please input Title' }]}
          >
            <Input
              name='title'
              value={title}
              type='text'
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item
            label='Description'
            rules={[{ required: true, message: 'Please input your description' }]}
          >
            <TextArea
              name='description'
              value={description}
              type='text'
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item label='Priority'>
            <Rate
              tooltips={desc}
              onChange={this.onPriorityChange}
              value={priority}
            />
            {priority ? <span className='ant-rate-text'>{desc[priority - 1]}</span> : ''}
          </Form.Item>
          <Form.Item
            label='Deadline'
            rules={[{ type: 'object', required: true, message: 'Please select date.' }]}
          >
            <DatePicker
              onChange={this.onDateChange}
              defaultValue={moment('2020-01-01', 'YYYY-MM-DD')}
            />
          </Form.Item>
          <Form.Item label='Completed'>
            <Switch
              checked={completed}
              onChange={this.onCompletedChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ marginRight: '10px' }}>
              Update
            </Button>
            <Button type='danger' onClick={() => this.onDelete(id)}>
              Delete
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default withRouter(EditTodo)
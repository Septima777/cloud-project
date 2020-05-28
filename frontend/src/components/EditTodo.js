import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Rate, DatePicker, Button } from 'antd';
import axios from 'axios';
import * as ROUTE from '../constants/routes'

const { TextArea } = Input;

const desc = ['Very low', 'Low', 'Medium', 'High', 'Very high'];
const INITIAL_STATE = {
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

  onFinish = () => {
    const { title, description, priority, deadline } = this.state
    const newTodo = {
      title: title,
      description: description,
      priority: priority,
      deadline: deadline,
      completed: false
    }

    axios
      .post('http://localhost:4000/api/todos/add', newTodo)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTE.TODOLIST);
      })
      .catch(error => {
        this.setState({ error });
      })
  }

  getTitle = () => {
    return this.state.title.toString()
  }

  render() {
    const { title, description, priority } = this.state
    console.log(this.state.title)
    return (
      <Form
        className='container'
        onFinish={this.onFinish}
      >
        <Form.Item
          name='title'
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
          name='description'
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
          name='deadline'
          label='Deadline'
          rules={[{ type: 'object', required: true, message: 'Please select date.' }]}
        >
          <DatePicker onChange={this.onDateChange} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Update
        </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(EditTodo)
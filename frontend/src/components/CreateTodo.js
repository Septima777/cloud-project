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

class CrateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
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
      .post('https://cloud-back-3fbd4.web.app/api/todos/add', newTodo)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTE.TODOLIST);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    const { title, description, priority } = this.state

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
            <DatePicker onChange={this.onDateChange} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Create
        </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default withRouter(CrateTodo)
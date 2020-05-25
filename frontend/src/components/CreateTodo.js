import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Rate, DatePicker, Button } from 'antd';

const { TextArea } = Input;
const desc = ['Very low', 'Low', 'Medium', 'High', 'Very high'];

class CrateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      responsible: '',
      priority: 3,
      deadline: '',
      completed: false
    }
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
    const { description, responsible, priority, deadline } = this.state
    console.log(this.state)
  }

  render() {
    const { description, responsible, priority } = this.state

    return (
      <Form
        className='container'
        onFinish={this.onFinish}
      >
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
        <Form.Item
          name='responsible'
          label='Responsible'
          rules={[{ required: true, message: 'Please input responsible' }]}
        >
          <TextArea
            name='responsible'
            value={responsible}
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
          label='DatePicker'
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
    )
  }
}

export default withRouter(CrateTodo)
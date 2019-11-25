import React from 'react';
import './messages.css';
import { messageService } from './message-service';

export class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.unsubscribe = messageService.subscribe((messages) => {
      this.setState({
        messages
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (!this.state.messages.length) {
      return null;
    }

    const messages = this.state.messages.map((message, index) => <div key={index}>{message}</div>);

    return (
      <div className="messages">
        <h2>Messages</h2>
        <button className="clear" onClick={messageService.clear}>clear</button>
        {messages}
      </div>
    );
  }
}
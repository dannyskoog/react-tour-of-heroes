
  let messages = [];
  let subscribers = [];

  const subscribe = (func) => {
    subscribers.push(func);
    func(messages);
    return () => subscribers = subscribers.filter(subscription => subscription !== func);
  };
  
  const add = (message) => {
    messages.push(message);
    notifySubscribers();
  };

  const clear = () => {
    messages = [];
    notifySubscribers();
  };

  const notifySubscribers = () => {
    subscribers.map((subscriber) => subscriber(messages));
  }

export const messageService = { subscribe, add, clear };
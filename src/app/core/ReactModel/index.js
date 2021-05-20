function ReactModel() {
  return function (target) {
    return class extends target {
      Observers = new Set();

      subscribe = listener => {
        this.Observers.add(listener);
        return this.onSubscribe(listener);
      };
      onSubscribe = listener => {
        return {
          ...this,
          unsubscribe: () => this.unsubscribe(listener),
        };
      };
      unsubscribe = listener => {
        this.Observers.delete(listener);
      };
      notifyListeners = () => { 
        this.Observers.forEach(listener => listener());
      };
    };
  };
}
export default ReactModel;

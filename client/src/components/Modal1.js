import React from "react";
import Modal from "react-modal";

class Modal1 extends Component {
    state = {
        isOpen = false,
    }

  render() {
    return (
      <div className="Modal1">
        <Modal isOpen={true}>
          <h2>Modal Title</h2>
          <p>Modal body</p>
        </Modal>
      </div>
    );
  }
}

export default Modal1;

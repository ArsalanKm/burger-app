import React, { Component } from "react";

import Modal from "../../components/Modal/Modal";
import styles from "./withErrorHandler.module.css";

const withErroHandler = (Wrapped, axios) => {
  return class extends Component {
    state = { error: null };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    };
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            backDropHandler={this.errorConfirmedHandler}
          >
            <div className={styles.Error}>
              {" "}
              {this.state.error ? this.state.error.message : null}
            </div>
          </Modal>
          <Wrapped {...this.props} />
        </>
      );
    }
  };
};

export default withErroHandler;

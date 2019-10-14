/*
 * @Author: Alfred Yang
 * @Github: https://github.com/cat-walk
 * @Date: 2019-10-12 11:48:15
 * @LastEditors: Alfred Yang
 * @LastEditTime: 2019-10-14 22:11:20
 * @Description: file content
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Toast, Modal } from 'antd-mobile';

// todo: why is the less didn't work?
import './index.css';

const clsPrefix = 'login';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalShow: false,
      errors: null
    };

    this.jumpToPersonalCenter = this.jumpToPersonalCenter.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  jumpToPersonalCenter() {
    const { history } = this.props;

    // const res = prompt('getAccount');
    const res = JSON.parse(prompt('getAccount'));
    console.log({
      res
    });

    if (res === null) {
      Toast.fail('Closed');
      return;
    }
    if (res.code !== 0) {
      this.setState({
        errors: res.error,
        isModalShow: true
      });
      // todo: find a toast that can should multi-line
      // Toast.fail(
      //   `There are some errors:
      //     ${errors}`,
      //   3
      // );
      return;
    }

    // todo: Is there other nice way to write the params?
    history.push(`/personal-center/${JSON.stringify(res.data)}`);
  }

  onCloseModal() {
    this.setState({
      isModalShow: false
    });
  }

  render() {
    const { errors, isModalShow } = this.state;

    return (
      <section
        className={`${clsPrefix}-container full-page-container center-container`}
      >
        <h1 className='dapp-name'>AElf Transfer Demo Dapp</h1>
        <div>
          <Button type='primary' inline onClick={this.jumpToPersonalCenter}>
            Login
          </Button>
        </div>
        <Modal
          visible={isModalShow}
          transparent
          maskClosable={false}
          onClose={this.onCloseModal}
          title='Failed'
          footer={[
            {
              text: 'Ok',
              onPress: () => {
                console.log('ok');
                this.onCloseModal();
              }
            }
          ]}
        >
          <p>There are some error:</p>
          {Array.isArray(errors) &&
            errors.map(item => {
              return (
                <p key={item.errorCode}>
                  {item.errorCode}: {item.errorMsg}
                </p>
              );
            })}
        </Modal>
      </section>
    );
  }
}

export default withRouter(Login);

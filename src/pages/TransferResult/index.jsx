/*
 * @Author: Alfred Yang
 * @Github: https://github.com/cat-walk
 * @Date: 2019-10-14 16:46:04
 * @LastEditors: Alfred Yang
 * @LastEditTime: 2019-10-15 00:27:25
 * @Description: file content
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card,
  WingBlank,
  WhiteSpace,
  List,
  Icon,
  Button,
  Toast,
  Modal
} from 'antd-mobile';
import { PacmanLoader } from 'react-spinners';
import { css } from '@emotion/core';

import { SYMBOL } from '../../constants';
import './index.css';

const Item = List.Item;
const Brief = Item.Brief;

const override = css`
  display: block;
  margin: 30px auto;
`;

function getFormItems() {
  const {
    amount,
    // minerFee,
    recieverAddress,
    senderAddress,
    momo,
    txId,
    blockHeight
  } = this.state;

  const formItems = [
    {
      title: 'amount',
      value: <span className='transfer-amount'>{`${amount} ${SYMBOL}`}</span>,
      isCopyable: false
    },
    // {
    //   title: 'miner fee',
    //   value: minerFee,
    //   isCopyable: false
    // },
    {
      title: 'reciever address',
      value: recieverAddress,
      isCopyable: true
    },
    {
      title: 'sender address',
      value: senderAddress,
      isCopyable: true
    },
    {
      title: 'momo',
      value: momo,
      isCopyable: false
    },
    {
      title: 'tx id',
      value: txId,
      isCopyable: true
    },
    {
      title: 'block height',
      value: blockHeight,
      isCopyable: false
    }
  ];

  return formItems;
}

class TransferResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      minerFee: null,
      recieverAddress: null,
      senderAddress: null,
      momo: null,
      txId: null,
      blockHeight: null,
      loading: true,
      status: null,
      isModalShow: false,
      errors: []
    };

    this.jumpToPersonalCenter = this.jumpToPersonalCenter.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentDidMount() {
    this.fetchTransactionResult();
  }

  onCloseModal() {
    this.setState({
      isModalShow: false
    });
  }

  fetchTransactionResult() {
    const { txId } = this.props.match.params;
    this.setState({
      txId
    });
    setTimeout(() => {
      const payload = {
        txId
      };
      const resBefore = prompt('queryTx?params=' + JSON.stringify(payload));
      console.log({
        resBefore
      });

      const res = JSON.parse(resBefore);
      console.log({
        payload,
        res
      });

      if (res === null) {
        Toast.fail('Closed');
        this.setState({
          loading: false
        });
        return;
      }
      if (res.code !== 0) {
        this.setState({
          errors: res.error,
          isModalShow: true,
          loading: false
        });
        // todo: find a toast that can should multi-line
        // Toast.fail(
        //   `There are some errors:
        //     ${errors}`,
        //   3
        // );
        return;
      }

      const { Status: status } = res.data;
      const {
        From: senderAddress,
        To: recieverAddress,
        RefBlockNumber: blockHeight
      } = res.data.Transaction;
      const params = JSON.parse(res.data.Transaction.Params);
      const { amount, memo } = params;

      this.setState({
        amount,
        // minerFee,
        recieverAddress,
        senderAddress,
        memo,
        txId,
        blockHeight,
        status,
        loading: false
      });

      console.log(`I'm success`);
    }, 4000);

    console.log({ txId });
  }

  jumpToPersonalCenter() {
    const { history } = this.props;
    history.push('/personal-center');
  }

  // todo: the modal's code is repeating
  render() {
    const { loading, status, isModalShow, errors } = this.state;
    const formItems = getFormItems.call(this);

    return (
      <section>
        <WingBlank size='lg'>
          <WhiteSpace size='lg' />
          <Card>
            {loading ? (
              <PacmanLoader
                css={override}
                sizeUnit={'px'}
                size={25}
                color={'#108ee9'}
                loading={loading}
              />
            ) : (
              <Card.Body>
                <div className='transfer-status-container'>
                  <Icon type='check-circle' color='green' />
                  <p className='transfer-status'>Transfer {status}</p>
                  {/* <p className='tip-color transfer-time'>
                    {new Date().toLocaleString()}
                  </p> */}
                </div>
                <List className='my-list'>
                  {formItems.map(item => {
                    return (
                      <Item extra={item.value} key={item.title}>
                        {item.title}:
                      </Item>
                    );
                  })}
                </List>
              </Card.Body>
            )}
          </Card>
          <Button type='primary' onClick={this.jumpToPersonalCenter}>
            Back to personal center
          </Button>
          <Button
            type='primary'
            style={{ marginTop: 30 }}
            onClick={() => {
              const { loading } = this.state;
              this.setState({
                loading: !loading
              });
            }}
          >
            Spinning
          </Button>
          <WhiteSpace size='lg' />
        </WingBlank>
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

export default withRouter(TransferResult);

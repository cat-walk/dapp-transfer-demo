/*
 * @Author: Alfred Yang
 * @Github: https://github.com/cat-walk
 * @Date: 2019-10-14 16:46:04
 * @LastEditors: Alfred Yang
 * @LastEditTime: 2019-10-14 20:30:20
 * @Description: file content
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, WingBlank, WhiteSpace, List, Icon, Button } from 'antd-mobile';

import { SYMBOL } from '../../constants';
import './index.css';

const Item = List.Item;
const Brief = Item.Brief;

function getFormItems() {
  const {
    amount,
    minerFee,
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
    {
      title: 'miner fee',
      value: minerFee,
      isCopyable: false
    },
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
      blockHeight: null
    };

    this.jumpToPersonalCenter = this.jumpToPersonalCenter.bind(this);
  }

  jumpToPersonalCenter() {
    const { history } = this.props;
    history.push('/personal-center');
  }

  render() {
    const formItems = getFormItems.call(this);

    return (
      <section>
        <WingBlank size='lg'>
          <WhiteSpace size='lg' />
          <Card>
            <Card.Body>
              <div className='transfer-status-container'>
                <Icon type='check-circle' color='green' />
                <p className='transfer-status'>Transfer success</p>
                <p className='tip-color transfer-time'>
                  {new Date().toLocaleString()}
                </p>
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
          </Card>
          <Button type='primary' onClick={this.jumpToPersonalCenter}>
            Back to personal center
          </Button>
          <WhiteSpace size='lg' />
        </WingBlank>
      </section>
    );
  }
}

export default withRouter(TransferResult);

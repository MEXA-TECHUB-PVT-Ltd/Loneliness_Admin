import React from 'react'
import { Col, Row } from 'reactstrap';
import Transactions from './components/Transactions';
import { getLocalToken } from "../../../../../utility/getLocalToken";
import Wallet from './components/Wallet';

const index = () => {
  const token = getLocalToken();

  return (
    <>
      <Row className="match-height">
        <Col xs="12">
          <Wallet token={token} />
          <Transactions token={token} />
        </Col>
      </Row>
    </>
  );
}

export default index

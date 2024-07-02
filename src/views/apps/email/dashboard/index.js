// ** React Imports
import { useContext } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { kFormatter } from "@utils";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import OrdersReceived from "@src/views/ui-elements/cards/statistics/OrdersReceived";
import SubscribersGained from "@src/views/ui-elements/cards/statistics/SubscribersGained";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import SetCommission from "./components/SetCommission";
import { useGetCountsQuery, useGetWalletQuery } from "../../../../redux/api";
import { getLocalToken } from "../../../../utility/getLocalToken";
import RejectedReason from "./reject_payments/components/RejectedReasons";
import TurnOverGraph from "./components/graphs/AdminGraph";

const AnalyticsDashboard = () => {
  const token = getLocalToken();
  // ** Context
  const { colors } = useContext(ThemeColors);
  const { data: counts, error, isLoading } = useGetCountsQuery({ token });
  const { data: wallet } = useGetWalletQuery({ token });
  

  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        <Col lg="3" sm="6">
          <SubscribersGained
            kFormatter={kFormatter}
            count={counts?.result?.users_count}
            title="Total Users"
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            kFormatter={kFormatter}
            count={counts?.result?.buddy_count}
            title="Total Buddies"
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            kFormatter={kFormatter}
            count={`$${wallet?.result?.amount || 0.0}`}
            title="Total Income"
          />
        </Col>
        <Col lg="3" sm="12">
          <SetCommission />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="12">
          <TurnOverGraph token={token} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="12">
          <RejectedReason token={token} />
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;

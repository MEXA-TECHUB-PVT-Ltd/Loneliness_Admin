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

const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);

  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        <Col lg="3" sm="6">
          <SubscribersGained kFormatter={kFormatter} />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained kFormatter={kFormatter} />
        </Col>
        <Col lg="6" sm="12">
          <SetCommission />
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;

// ** Third Party Components
import { Users } from "react-feather";

// ** Custom Components
import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";

const SubscribersGained = ({ kFormatter }) => {
  return (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color="primary"
      statTitle="Total Users"
      stats={20}
    />
  );
};

export default SubscribersGained;

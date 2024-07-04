// ** Third Party Components
import { Users } from "react-feather";

// ** Custom Components
import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";

const SubscribersGained = ({ kFormatter, count, title }) => {
  return (
    <StatsWithAreaChart
      // icon={<Users size={21} />}
      color="primary"
      statTitle={title}
      stats={count}
    />
  );
};

export default SubscribersGained;

import { Component } from "react";
import ReactApexChart from "react-apexcharts";

class TeamResponse extends Component {
   constructor(props) {
      super(props);

      const bad = this.props?.data?.bad.length;
      const good = this.props?.data?.good.length;
      const nothing = this.props?.data?.nothing.length;
      const positive = this.props?.data?.positive.length;

      this.state = {
         series: [good, positive, nothing, bad],
         options: {
            chart: {
               width: 330,
               type: "pie",
            },
            labels: ["Good", "Positive", "Nothing", "Negative"],
            responsive: [
               {
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200,
                     },
                     legend: {
                        position: "bottom",
                     },
                  },
               },
            ],
         },
      };
   }

   render() {
      return (
         <div id="chart">
            <ReactApexChart
               options={this.state.options}
               series={this.state.series}
               type="pie"
               width={330}
            />
         </div>
      );
   }
}

export default TeamResponse;

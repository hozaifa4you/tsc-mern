import { Component } from "react";
import ReactApexChart from "react-apexcharts";

class TeamResponse extends Component {
   constructor(props) {
      super(props);

      this.state = {
         series: [44, 55, 13, 43],
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

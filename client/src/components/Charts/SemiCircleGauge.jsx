import { Component } from "react";
import Chart from "react-apexcharts";

class RadialBar extends Component {
   constructor(props) {
      super(props);

      this.state = {
         series: [this.props.percentage],
         options: {
            chart: {
               type: "radialBar",
            },
            plotOptions: {
               radialBar: {
                  hollow: {
                     size: "70%",
                  },
               },
            },
            labels: ["Completed"],
         },
      };
   }

   render() {
      return (
         <div className="donut">
            <Chart
               options={this.state.options}
               series={this.state.series}
               type="radialBar"
               width={200}
               height={200}
            />
         </div>
      );
   }
}

export default RadialBar;

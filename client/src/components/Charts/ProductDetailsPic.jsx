import { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ProductDetailsPie extends Component {
   constructor(props) {
      super(props);

      this.state = {
         series: [44, 55, 13, 43, 22],
         options: {
            chart: {
               width: 330,
               type: "pie",
            },
            labels: ["Good", "Negative", "Positive", "Nothing", "Blur"],
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

export default ProductDetailsPie;

// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { DataAnalytics } from 'src/app/service/data-analytics.service';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf'; // Import jsPDF



interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit  {
  title = 'chartDemo';

  barChart: any;
  pieChart: any;

  // exportChart(chartId: string, fileName: string) {
  //   const chartContainer = document.getElementById(chartId);
  //   if (chartContainer) {
  //     html2canvas(chartContainer).then((canvas) => {
  //       const dataUrl = canvas.toDataURL('image/png');
  //       const a = document.createElement('a');
  //       a.href = dataUrl;
  //       a.download = `${fileName}.png`;
  //       a.click();
  //     });
  //   }
  // }

  exportAllChartsPDF() {
    const chartsToExport = [
      'pieChart',
      'pieChart2',
      'pieChart3',
      'pieChart4',
      'barChart3',
      'barChart2',
      'barChart',
    ];
  
    const pdf = new jsPDF('l', 'mm', 'a4'); // Create a new jsPDF instance
    let currentY = 10;
    const pageHeight = pdf.internal.pageSize.height;
  
    for (const chartId of chartsToExport) {
      const chartContainer = document.getElementById(chartId);
  
      if (chartContainer) {
        html2canvas(chartContainer).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 190; // Define the width of the image in the PDF
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
          if (currentY + imgHeight > pageHeight) {
            pdf.addPage(); // Add a new page if the content exceeds the current page
            currentY = 10;
          }
  
          pdf.addImage(imgData, 'PNG', 10, currentY, imgWidth, imgHeight);
          currentY += imgHeight + 10;
  
          if (chartId === chartsToExport[chartsToExport.length - 1]) {
            pdf.save('all_charts.pdf'); // Save the PDF once all charts are added
          }
        });
      }
    }
  }

  
  
  
  


  constructor(
    private dataAnalytics: DataAnalytics
  ) { }

  ngOnInit() 
  {
    this.dataAnalytics.getCategoryStatistics().subscribe((data) => {
      debugger
      const labels = data.map((item) => `${item[0]} (${item[1]} pair of shoes)`);

      const percentages = data.map((item) => item[2]);

      const backgroundColors = this.generateRandomColors(data.length);

      this.pieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: percentages,
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
    this.dataAnalytics.getProviderStatistics().subscribe((data) => {
      debugger
      const labels = data.map((item) => `${item[0]} (${item[1]} pair of shoes)`);
      const percentages = data.map((item) => item[2]);

      const backgroundColors = this.generateRandomColors(data.length);

      this.pieChart = new Chart('pieChart2', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: percentages,
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
    this.dataAnalytics.getOrderStatusStatistic().subscribe((data) => {
      debugger
      const labels = data.map((item) => `${item[0]} (${item[1]} đơn)`);
      const percentages = data.map((item) => item[2]);

      const backgroundColors = this.generateRandomColors(data.length);

      this.pieChart = new Chart('pieChart3', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: percentages,
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
    this.dataAnalytics.getPriceStatistics().subscribe((data) => {
      debugger
      const labels = data.map((item) => `${item[0]} (${item[1]} pair of shoes)`);
      const percentages = data.map((item) => item[2]);

      const backgroundColors = this.generateRandomColors(data.length);

      this.pieChart = new Chart('pieChart4', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: percentages,
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
    this.dataAnalytics.getRevenue().subscribe((data) => {
      debugger
      console.log(data)
      const date  = data.map((item) => item.date);
      const giaGoc = data.map((item) => item.value1);
      const doanhThu = data.map((item) => item.value2);
      const loiNhuan = data.map((item) => item.value3);
      
      
      
    
      const barChart = new Chart('barChart3', { 
        type: 'bar',
        data: {
          labels: date,
          datasets: [
            {
              label: 'Giá gốc',
              data: giaGoc,
              backgroundColor: '#FA8072',
              borderColor: '#FA8072',
              borderWidth: 1,
            },
            {
              label: 'Doanh thu',
              data: doanhThu,
              backgroundColor: '#0196FD',
              borderColor: '#0196FD',
              borderWidth: 1,
            },
            // {
            //   label: 'Lợi nhuận',
            //   data: loiNhuan2,
            //   backgroundColor: '#ff9a3c',
            //   borderColor: '#ff9a3c',
            //   borderWidth: 1,
            //   stack: 'Stack 0'
            // },
            {
              label: 'Lợi nhuận',
              data: loiNhuan,
              backgroundColor: '#ff9a3c',
              borderColor: '#ff9a3c',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
    this.dataAnalytics.getSizesStatistic().subscribe((data) => {
      debugger
      console.log(data)
      const products = data.map((item) => `Size ${item[0]} (${item[2]}%)`);
      const quantities = data.map((item) => item[1]);
      const barChart = new Chart('barChart2', {
        type: 'bar',
        data: {
          labels: products,
          datasets: [
            {
              label: 'Quantity of size',
              data: quantities,
              backgroundColor: '#0196FD',
              borderColor: '#0196FD',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
    this.dataAnalytics.getQuantityOfEachProductStatistics().subscribe((data) => {
      debugger
      console.log(data)
      const products = data.map((item) => `${item[0]}: ${item[1]}`);
      const quantities = data.map((item) => item[2]);
      const barChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: products,
          datasets: [
            {
              label: 'Quantity of product',
              data: quantities,
              backgroundColor: '#ff9a3c',
              borderColor: '#ff9a3c',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
    

    
  }


  generateRandomColors(numColors: number) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(randomColor);
    }
    return colors;
  }
}


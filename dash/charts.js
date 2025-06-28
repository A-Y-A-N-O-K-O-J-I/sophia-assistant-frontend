document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('adminChart').getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
  gradient.addColorStop(1, 'rgba(168, 85, 247, 0.1)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [{
        data: [800, 400, 600, 300, 500, 1200, 900, 400],
        borderColor: '#8b5cf6',
        backgroundColor: gradient,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#7c3aed',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#a78bfa',
          borderWidth: 1,
          displayColors: false,
          padding: 12,
          callbacks: {
            label: ctx => ' ' + ctx.parsed.y + ' activities'
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#6b7280' }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#6b7280',
            callback: val => val === 0 ? '0' : val / 1000 + 'K'
          }
        }
      },
      elements: {
        point: { hoverBackgroundColor: '#7c3aed' }
      }
    }
  });
});

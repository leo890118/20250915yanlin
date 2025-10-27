let chart = null; //圖表實體
let modelData = null; //儲存模型資料

// 頁面戴入完成後才執行
// 監聽 DOMContentLoaded 事件，確保網頁元素已載入再執行初始化
// 這裡會自動呼叫 loadRegressionData() 來載入資料與繪圖
// ---------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    loadRegressionData();
});

// 取得迴歸資料並繪製圖表
async function loadRegressionData() {
    showLoading(true); // 顯示 loading 畫面
    try {
        // 從後端 API 取得資料
        const response = await fetch('/api/regression/data')
        if (!response.ok) {
            throw new Error(`網路出現問題:${response.statusText}`)
        }
        const data = await response.json()

        if (!data.success) {
            throw new Error(`解析josn失敗`);
        }
        modelData = data

        // 繪制圖表
        renderChart(data)

    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }

};

// 將資料繪製成 Chart.js 圖表
function renderChart(data) {
    const ctx = document.getElementById('regressionChart').getContext('2d')

    // 若圖表已存在，先銷毀避免重複繪製
    if (chart) {
        chart.destroy();
    }
    // 準備訓練資料集（x, y 配對）
    // trainData 會用於顯示藍色點
    const trainData = data.data.train.x.map((xvalue, index) =>
    ({
        x: xvalue,
        y: data.data.train.y[index]
    })
    )

    //準備測試資料集（粉紅色點）
    const testData = data.data.test.x.map((xvalue, index) =>
    ({
        x: xvalue,
        y: data.data.test.y[index]
    })
    )

    //準備迴歸線資料集（橘色線）
    const regressionLine = data.data.regression_line.x.map((xvalue, index) =>
    (
        {
            x: xvalue,
            y: data.data.regression_line.y[index]
        }
    )
    )

    //使用 Chart.js 建立散點圖與迴歸線
    chart = new Chart(ctx, {
        type: 'scatter',   // 主圖表類型為散點圖
        data: {
            datasets: [
                {
                    label: '訓練資料', // 藍色點
                    data: trainData,
                    backgroundColor: 'rgba(102, 126, 234, 0.6)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: '測試資料', // 粉紅色點
                    data: testData,
                    backgroundColor: 'rgba(237, 100, 166, 0.6)',
                    borderColor: 'rgba(237, 100, 166, 1)',
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: '迴歸線', // 橘色線
                    data: regressionLine,
                    type: 'line',
                    borderColor: '#f59e0b',
                    borderWidth: 3,
                    fill: false,
                    pointRadius: 0,
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,// 自動調整大小
            maintainAspectRatio: false,// 不維持原始比例
            // 點擊圖表資料點時觸發
            onClick: function (evt, activeElements) {
                if (activeElements.length > 0) {
                    const element = activeElements[0]
                    const datasetIndex = element.datasetIndex
                    const index = element.index
                    const dataset = chart.data.datasets[datasetIndex]

                    if (datasetIndex === 0 || datasetIndex === 1) { //訓練或測試資料
                        const point = dataset.data[index]
                        const rooms = point.x

                        //更新輸入框
                        document.getElementById('rooms-input').value = rooms.toFixed(1)
                        predictPrice(rooms)

                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '平均方間數 vs 房價',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20

                },
                tooltip: {
                    callbacks: {
                        // 自訂提示文字內容
                        label: function (context) {
                            const datasetLabel = context.dataset.label || '';
                            const xValue = context.parsed.x.toFixed(2);
                            const yValue = context.parsed.y.toFixed(2);
                            return `${datasetLabel}: (平均房間數:${xValue}, 房價:${yValue})`;
                        },
                        afterLabel: function (context) {
                            if (context.datasetIndex === 0 || context.datasetIndex === 1) {
                                return '點擊可預測此資料點';
                            }
                            return '';
                        }
                    } 
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: `${data.description.feature_name} (${data.description.feature_unit})`,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)' // x 軸網格線顏色
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: `${data.description.target_name} (${data.description.target_unit})`,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    })
}

// 預測房價（目前僅 console.log，可擴充呼叫 API）
async function predictPrice(rooms) {
    if (isNaN(rooms) || rooms < 1 || rooms > 15) {
        alert('請輸入有效的房間數(1~15間)')
        return;
    }

    const response = await fetch(`/api/regression/predict?rooms=${rooms}`)
    console.table(response)
}
// 控制 loading 畫面顯示與隱藏
function showLoading(show) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.add('active');// 顯示 loading
    } else {
        loading.classList.remove('active'); // 隱藏 loading
    }
};
// 顯示錯誤訊息（彈窗 + console）
function showError(message) {
    alert('錯誤:' + message);  // 顯示錯誤彈窗
    console.log(message)  // 輸出錯誤至 console
}
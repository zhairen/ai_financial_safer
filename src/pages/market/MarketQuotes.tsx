import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Button  // 新增按钮导入
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// 新增图表组件导入
import { 
  LineChart, 
  LineSeries, 
  ChartsXAxis, 
  ChartsYAxis, 
  ChartsGrid, 
  ChartsTooltip 
} from '@mui/x-charts';

import * as React from 'react';

// 日期格式化函数（参考示例）
const dateFormatter = Intl.DateTimeFormat(undefined, {
  month: '2-digit',
  day: '2-digit',
});
const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数

// 随机数生成函数（参考示例）
function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const MarketQuotesPage = () => {
  // 模拟市场行情数据（实际项目中通过useData获取）
  const marketData = {
    stock: { name: 'A股', price: 3050.12, change: '+12.34', color: '#3ac47d' },
    bond: { name: '10年期国债', price: 2.68, change: '-0.02', color: '#d92550' },
    forex: { name: '美元/人民币', price: 7.15, change: '+0.03', color: '#2c7be5' },
  };

  
  // 新增趋势图状态管理（参考示例）
  const [running, setRunning] = React.useState(false);
  const [date, setDate] = React.useState(new Date(2024, 0, 1)); // 初始日期
  const [stockData, setStockData] = React.useState<number[]>(() => {
    // 初始化50天的模拟数据
    return Array.from({ length: 50 }, (_, i) => 3000 + randBetween(-200, 200));
  });

  // 动态更新数据的Effect（参考示例）
  React.useEffect(() => {
    if (!running) return;
    const intervalId = setInterval(() => {
      setDate(prev => new Date(prev.getTime() + oneDay));
      setStockData(prev => [
        ...prev.slice(1), // 移除最旧数据
        prev.at(-1)! + randBetween(-50, 50) // 新增当天数据（±50波动）
      ]);
    }, 100); // 每100ms更新一次（模拟实时）
    return () => clearInterval(intervalId);
  }, [running]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        市场行情概览
      </Typography>

      {/* 恢复实时行情卡片（包含涨跌幅） */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* 股票行情卡片 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={marketData.stock.name} subheader="实时行情" />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: marketData.stock.color }}>
                {marketData.stock.price}
              </Typography>
              {/* 恢复涨跌幅显示 */}
              <Typography variant="body2" color="text.secondary">
                日涨跌幅：{marketData.stock.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 债券行情卡片 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={marketData.bond.name} subheader="实时行情" />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: marketData.bond.color }}>
                {marketData.bond.price}
              </Typography>
              {/* 恢复涨跌幅显示 */}
              <Typography variant="body2" color="text.secondary">
                日涨跌幅：{marketData.bond.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 外汇行情卡片 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={marketData.forex.name} subheader="实时行情" />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: marketData.forex.color }}>
                {marketData.forex.price}
              </Typography>
              {/* 恢复涨跌幅显示 */}
              <Typography variant="body2" color="text.secondary">
                日涨跌幅：{marketData.forex.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 重新实现的A股趋势图 */}
      <Card sx={{ p: 2 }}>
        <CardHeader title="A股近期走势" subheader="实时更新价格趋势（模拟数据）" />
        <div style={{ width: '100%' }}>
          <LineChart
            height={300}
            // 生成与stockData长度匹配的日期数组（x轴数据）
            xAxis={[
              { 
                data: stockData.map((_, index) => 
                  new Date(date.getTime() + index * oneDay)
                ),
                valueFormatter: (value: Date) => dateFormatter.format(value), // 日期格式化
                label: '日期'
              }
            ]}
            series={[
              {
                data: stockData, // 直接使用价格数据数组
                area: true, // 启用面积填充（与示例一致）
                color: marketData.stock.color, // 保持颜色一致
                showMark: false // 不显示数据点标记
              }
            ]}
          >
            <ChartsGrid strokeDasharray="3 3" />
            <ChartsYAxis label="指数点数" />
            <ChartsTooltip />
          </LineChart>
          
          {/* 控制按钮（参考示例） */}
          <div style={{ marginTop: '8px', display: 'flex', gap: '4px' }}>
            <Button 
              size="small" 
              variant="contained" 
              onClick={() => setRunning(p => !p)}
            >
              {running ? '暂停' : '开始'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                // 重置数据为初始状态
                setStockData(() => Array.from({ length: 50 }, (_, i) => 3000 + randBetween(-200, 200)));
                setDate(new Date(2024, 0, 1));
              }}
            >
              重置数据
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
};
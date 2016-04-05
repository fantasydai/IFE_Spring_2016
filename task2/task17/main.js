/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = [];

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  var target=event.target;
  // 确定是否选项发生了变化 
  if(target.nodeName.toLowerCase()=="label"&&target.firstElementChild.value!=pageState.nowGraTime){
        pageState.nowGraTime=target.firstElementChild.value;
        for(var i=0;i<target.parentNode.children.length;i++){
            target.parentNode.children[i].className="";
        }
        target.className="checked";
  }
  initAqiChartData();
  renderChart();
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
   var target=event.target;
   if(target.nodeName="select"&&target.value!=pageState.nowSelectCity){
      for(var i=0;i<Object.keys(aqiSourceData).length;i++){
        if(target.value===Object.keys(aqiSourceData)[i]){
            pageState.nowSelectCity=i;
        }
      }
   }
  initAqiChartData();
  renderChart();
  // 设置对应数据

  // 调用图表渲染函数

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var selectTime=document.getElementById("form-gra-time");
  selectTime.addEventListener("click",graTimeChange,false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var fragment=document.createDocumentFragment(),
        selectCity=document.getElementById("city-select"),
        cityList=Object.keys(aqiSourceData);
  for(var i=0;i<cityList.length;i++){
    var newCity=document.createElement("option");
    newCity.innerHTML=cityList[i];
    fragment.appendChild(newCity);
  }
  selectCity.appendChild(fragment);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  selectCity.addEventListener("change",citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var city=Object.keys(aqiSourceData)[pageState.nowSelectCity],
        time=pageState.nowGraTime,
        selectCity=Object.keys(aqiSourceData[city]),
         selectData=aqiSourceData[city],
         newValue=0,
         weekLength=0;
        chartData = [];
      if(time==="day"){
        for(var i=0;i<selectCity.length;i++){
            chartData.push(aqiSourceData[city][selectCity[i]]);
        }
      }else if(time==="week"){
        for(var i=0;i<selectCity.length;i++){
            var date=new Date(selectCity[i]);
            newValue+=aqiSourceData[city][selectCity[i]];
            weekLength+=1;
            if(date.getDay()===0){
              chartData.push(Math.round(newValue/weekLength));
              newValue=0;
              weekLength=0;
              continue;
            }
        }
      }
}

/**
 * 初始化函数
 */
function init() {
  initCitySelector();
  initGraTimeForm();
   initAqiChartData();
}
init();

export default new Promise((resolve, reject) => {
  let currentCity = '';
  // var map = new BMap.Map("bdmap");
  // map.centerAndZoom("广州", 15);
  // map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
  // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(
    res => {
    //   console.log(res);
      // 设置当前城市
      currentCity = res.address.city.replace(/市$/, '');
    //   console.log(currentCity)
      // this.getMovie();
      resolve(currentCity);

      // map.centerAndZoom(new BMap.Point(res.longitude,res.latitude),11);
    });
})

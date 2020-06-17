


// main
axios.get('./router/about.json')
    .then(function (res) {
        $('main > ul').append(`
            <li class="map-show" id="allmap"></li>
        `)

        var map = new BMap.Map("allmap");
        var point = new BMap.Point(13274766.191805037, 2987611.95223);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 1);
        map.enableScrollWheelZoom(true);


        res.data.about.forEach(function (item) {
            $('main > ul .aboutText').append(`
                <p>
                    <span class="iconfont ${item.icon}"></span>
                    <span>${item.text}</span>
                </p>
            `)
        })
    })



// footer
axios.get('./router/about.json')
    .then(function (res) {
        console.log(res)
        res.data.about.forEach(function (item) {
            $('footer > ul').append(`
                <li>
                    <a href="./about.html"><span class="iconfont ${item.icon}"></span></a><br>
                    <span>${item.text}</span>
                </li> 
            `)
        })
        $('footer > ul').append(`
            <li>
                <a href="./about.html"><span><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1838781477,1688363439&fm=115&gp=0.jpg" alt="" /></span></a><br/>
                <span>扫一扫 加入复仇者联盟</span>
            </li> 
        `)
    })
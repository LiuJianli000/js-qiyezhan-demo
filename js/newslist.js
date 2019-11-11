
axios.get(`./router/newsinfo-page=1.json`)
    .then(function (res) {
        console.log(res)
        let item = res.data.news[0]

        $('#titleDivAA').append(`
                <span class="red"></span><p class="newsTitle">${item.title}</p>
                <p class="dateAA">${item.date} &nbsp ${item.date2}</p>
            `)
        $('#infoAA').append(`
                <img src="${item.img}" alt="">
                    <p>${item.text}</p>
                    <p>${item.text}</p>
            `)



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
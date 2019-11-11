// footer
axios.get('./router/about.json')
    .then(function (res) {
        // console.log(res)
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


var num = 1
function render() {
    axios.get(`./router/newsinfo-page=${num}.json`)
        .then(function (res) {
            // console.log(res)
            res.data.news.forEach(function (item) {
                $('#newsInfo > ul').append(`
                    <li>
                        <a href="./newslist.html" name="${item}"><img src="${item.img}" alt=""></a>
                        <div class="msg">
                            <p class="title">${item.title}</p>
                            <p class="date">${item.date}</p>
                            <p class="text">${item.text}</p>
                        </div>
                    </li>
                `)


            })
        })
        // .then(function(res) {
        //     $('#newsInfo > ul > li').click(function() {
        //         // let aa = $(this).find('a').attr('name')
        //         console.log($(this).index())
        //         let bb = $(this).index()
        //         let aa = res.data.news[bb]
        //         $('#titleDivAA').append(`
        //             <span class="red"></span><p class="newsTitle">${aa.title}</p>
        //             <p class="dateAA">${aa.date} &nbsp ${aa.date2}</p>
        //         `)
        //         $('#infoAA').append(`
        //             <img src="${aa.img}" alt="">
        //             <p>${aa.text}</p>
        //             <p>${aa.text}</p>
        //         `)
        //     })
        // })
        
}
render()

$('#page ul > li').click(function () {
    $('#newsInfo > ul').empty()
    num = $(this).index() + 1
    render()
})









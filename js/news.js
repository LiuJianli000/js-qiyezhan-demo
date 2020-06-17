// footer
$(document).ready(function () {
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

    var total = 0
    function fetch(num, refetch) {
        axios.get(`https://mock-api.com/mgvrkAgQ.mock/newsinfo?page=${num}`)
            .then(function (res) {
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

                total = res.data.total
                if (!refetch) {
                    var page = Math.ceil(res.data.total / 8)
                    $('#page ul').append(`<li id="pre"><</li>`)
                    for (i = 1; i <= page; i++) {
                        $('#page ul').append(`<li class="common">${i}</li>`)
                    }
                    $('#page ul').append(`<li id="next"">></li>`)

                    $('#page ul .common:first').css({ "background-color": "#baeffd" })
                }
            })
    }

    const refetch = page => {
        $('#newsInfo > ul').empty()
        fetch(page, 'refetch')

        $('#page ul').children('.common').each(function () {
            if (page == $(this).text()) {
                $('#page ul li').css({ "background": 'white' })
                $(this).css({ "background-color": "#baeffd" })
            }
        })
    }

    const render = async () => {
        var page = 1
        await fetch(page)

        $('#page ul').on('click', "#pre", function () {
            if (page >= 2) {
                page--
                refetch(page)
            }
        })

        $('#page ul').on('click', '.common', function () {
            page = $(this).text()
            refetch(page, $(this))
        })

        $('#page ul').on('click', "#next", function () {
            if (page < total / 8) {
                page++
                refetch(page)
            }
        })
    }

    render()
})









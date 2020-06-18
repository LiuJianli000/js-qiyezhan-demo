$(document).ready(function () {
    // banner 轮播
    axios.get('./router/banner-img.json')
        .then(function (res) {
            res.data.forEach(function (item) {
                $('.panels').append(`<a href="#"><img src="${item.src}"></a>`)
            });

            class Carousel {
                constructor(root) {
                    this.root = root
                    this.panels = Array.from(root.querySelectorAll('.panels a'))
                    this.dotCt = root.querySelector('.dots')
                    this.dots = Array.from(root.querySelectorAll('.dots span'))
                    this.pre = root.querySelector('.pre')
                    this.next = root.querySelector('.next')

                    this.bind()
                }

                bind() {
                    this.dotCt.onclick = e => {
                        if (e.target.tagName !== 'SPAN') return

                        let index = this.dots.indexOf(e.target)
                        this.setDot(index)
                        this.showPage(index)
                    }

                    this.pre.onclick = e => {
                        let index = this.dots.indexOf(this.root.querySelector('.dots .active'))
                        index = (index - 1 + this.dots.length) % this.dots.length
                        this.setDot(index)
                        this.showPage(index)
                    }

                    this.next.onclick = e => {
                        let index = this.dots.indexOf(this.root.querySelector('.dots .active'))
                        index = (index + 1) % this.dots.length
                        this.setDot(index)
                        this.showPage(index)
                    }
                }

                setDot(index) {
                    this.dots.forEach(dot => dot.classList.remove('active'))
                    this.dots[index].classList.add('active')
                }

                showPage(index) {
                    this.panels.forEach(panel => panel.style.zIndex = 0)
                    this.panels[index].style.zIndex = 1
                }
            }

            new Carousel(document.querySelector('.carousel'))
        })

    // 获取团队信息
    axios.get('./router/team-info.json')
        .then(function (res) {
            // console.log(res)
            res.data.team.forEach(function (item) {
                // console.log(item.img)
                $('#team > ul').append(`
                        <li>
                            <div class="contentImg"><img src="${item.img}" alt=""></div>
                            <div class="contentBox">
                                <h2>${item.title}</h2>
                                <p class="text">${item.text}</p>
                                <hr />
                                <p class="attr">能 &nbsp 力: ${item.attr}</p>
                            </div>
                        </li>
                    `)
            })
        })

    // 获取新闻信息
    axios.get('./router/news.json')
        .then(function (res) {
            // console.log(res)
            res.data.news.forEach(function (item) {
                $('#news > ul').append(`
                        <li>
                            <a href="./news.html"><img src="${item.img}" alt=""></a>
                            <p class="newsTitle">${item.title}</p>
                            <hr>
                            <p class="newsText">${item.text}</p>
                        </li> 
                    `)
            })
        })

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
    
})